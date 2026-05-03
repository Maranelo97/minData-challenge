import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  imports: [],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicForm { }