import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../../../core/models/frontend/IHeroFront';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/heroes';

  // 1. Fuentes de la verdad (Private Streams)
  // Usamos un BehaviorSubject para controlar la búsqueda
  private searchSubject = new BehaviorSubject<string>('');

  // 2. State de carga (Signal básica)
  public isLoading = signal<boolean>(false);

  // 3. El "Cerebro" de RxJS
  // Este observable se encarga de reaccionar a cada cambio de búsqueda
  private heroes$ = this.searchSubject.pipe(
    tap(() => this.isLoading.set(true)),
    switchMap((term) => this.fetchHeroes(term)),
    tap(() => this.isLoading.set(false)),
    catchError((err) => {
      console.error('Data stream error:', err);
      return of([]); // Recuperación elegante
    }),
  );

  // 4. LA MAGIA: Convertimos el Observable a Signal para la UI
  // Cualquier componente que lea 'heroes()' se suscribirá automáticamente
  public heroes = toSignal(this.heroes$, { initialValue: [] as Hero[] });

  /**
   * Actualiza el término de búsqueda y dispara el flujo RxJS
   */
  updateSearch(name: string) {
    this.searchSubject.next(name);
  }

  /**
   * Petición HTTP pura
   */
  private fetchHeroes(name: string): Observable<Hero[]> {
    const url = name ? `${this.API_URL}?name=${name}` : this.API_URL;
    return this.http.get<Hero[]>(url);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.API_URL}/${id}`);
  }
}
