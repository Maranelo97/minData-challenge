import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
  tap,
  debounceTime,
  combineLatest,
  map,
} from 'rxjs';

import { Hero } from '../../../core/models/frontend/IHeroFront';
import { environment } from '../../../enviroment';
import { PaginationService } from './PaginationService';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private http = inject(HttpClient);
  private pagination = inject(PaginationService);

  // --- STATE ---
  private fullDataCache: Hero[] | null = null;
  private searchSubject = new BehaviorSubject<string>('');

  public searchQuery = signal<string>(''); // Texto crudo del input
  public isLoading = signal<boolean>(false);

  // --- COMPUTED (PREDICCIONES INSTANTÁNEAS) ---
  public predictions = computed(() => {
    const term = this.searchQuery().toLowerCase().trim();
    // Solo predecimos si hay caché y el usuario escribió 2+ caracteres
    if (term.length < 2 || !this.fullDataCache) return [];

    return this.fullDataCache.filter((hero) => hero.name.toLowerCase().includes(term)).slice(0, 5);
  });

  // --- STREAM PRINCIPAL (HEROES PAGINADOS) ---
  private heroes$ = combineLatest([
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.pagination.reset()), // Reset a pag 1 al buscar
    ),
    toObservable(this.pagination.currentPage),
    toObservable(this.pagination.itemsPerPage),
  ]).pipe(
    tap(() => this.isLoading.set(true)),
    switchMap(([term, page, limit]) =>
      this.fetchHeroes().pipe(
        map((allHeroes) => {
          // 1. Filtrado local (Expertise: Manejo de data en memoria)
          const filtered = allHeroes.filter((h) =>
            h.name.toLowerCase().includes(term.toLowerCase()),
          );

          // 2. Notificar al paginador el total de resultados filtrados
          this.pagination.totalItems.set(filtered.length);

          // 3. Segmentación (Paginación manual)
          const startIndex = (page - 1) * limit;
          return filtered.slice(startIndex, startIndex + limit);
        }),
      ),
    ),
    tap(() => this.isLoading.set(false)),
    catchError(() => of([])),
  );

  // Signal que consume el Grid
  public heroes = toSignal(this.heroes$, { initialValue: [] as Hero[] });

  // --- MÉTODOS ---

  /**
   * Se llama desde el SearchBar (onSearch)
   */
  public updateSearch(name: string) {
    this.searchQuery.set(name); // Dispara predictions()
    this.searchSubject.next(name); // Dispara el stream heroes$ (con debounce)
  }

  /**
   * Obtiene los datos. Si ya están en caché, no hace petición HTTP.
   */
  private fetchHeroes(): Observable<Hero[]> {
    if (this.fullDataCache) return of(this.fullDataCache);

    return this.http.get<Hero[]>(`${environment.API_URL}/heroes`).pipe(
      tap((data) => (this.fullDataCache = data)),
      catchError((err) => {
        console.error('Error fetching heroes:', err);
        return of([]);
      }),
    );
  }

  public getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${environment.API_URL}/heroes/${id}`);
  }
}
