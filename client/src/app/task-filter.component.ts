import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter">
      <button
        *ngFor="let f of filters"
        [class.active]="f === active"
        (click)="select(f)"
      >
        {{ f }}
      </button>
    </div>
  `,
  styles: [`
    .filter { margin-bottom: 1rem; }
    button { margin-right: .5rem; padding: .5rem 1rem; }
    .active { font-weight: bold; text-decoration: underline; }
  `]
})
export class TaskFilterComponent {
  @Input() filters: string[] = ['All','Pending','Completed'];
  @Input() active: string = 'All';
  @Output() filterChange = new EventEmitter<string>();

  select(filter: string) {
    if (filter !== this.active) {
      this.active = filter;
      this.filterChange.emit(this.active);
    }
  }
}
