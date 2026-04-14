import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DrawwerService } from '../../../../shared/components/Drawer/DrawerService';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './SearchBar.html',
  styleUrl: './SearchBar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  protected drawerService = inject(DrawwerService);

  public openCreate(): void {
    this.drawerService.open({
      mode: 'CREATE',
      title: 'Create Hero',
      subtitle: 'Add Your Hero',
    });
  }
}
