import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaginationService } from '../../../features/Heroes/services/PaginationService';

@Component({
  selector: 'app-paginator',
  standalone: true,
  templateUrl: './Paginator.html',
  styleUrl: './Paginator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Ya no necesitamos imports: [CommonModule, FormsModule]
})
export class Paginator {
  public pg = inject(PaginationService);

  // Helper para manejar el cambio de límite sin ngModel
  public onLimitChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.pg.setLimit(Number(value));
  }
}