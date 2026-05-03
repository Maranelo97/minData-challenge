import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  // Estado básico
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(25); // Default 25
  public totalItems = signal<number>(0);
  
  // Opciones de configuración para el usuario
  public readonly pageOptions = [5, 10, 25, 50];

  // Cálculos reactivos
  public totalPages = computed(() => {
    const total = this.totalItems();
    const limit = this.itemsPerPage();
    return total > 0 ? Math.ceil(total / limit) : 1;
  });

  public isFirstPage = computed(() => this.currentPage() === 1);
  public isLastPage = computed(() => this.currentPage() >= this.totalPages());

  public nextPage() {
    if (!this.isLastPage()) this.currentPage.update(p => p + 1);
  }

  public prevPage() {
    if (!this.isFirstPage()) this.currentPage.update(p => p - 1);
  }

  public setLimit(limit: number) {
    this.itemsPerPage.set(limit);
    this.currentPage.set(1); // Reset al cambiar el tamaño
  }

  public reset() {
    this.currentPage.set(1);
    this.totalItems.set(0);
  }
}