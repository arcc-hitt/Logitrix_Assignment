import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter">
      <button
        class="filter-btn"
        *ngFor="let f of filters"
        [class.active]="f === active"
        (click)="select(f)"
      >
        {{ f }}
      </button>
    </div>
  `,
  styles: [`
    .filter {
        margin-bottom: 1rem;
        display: flex;
        gap: 0.5rem;
    }
    .filter-btn {
      padding: 0.5rem 0.75rem;
      min-width: 2.5rem;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .filter-btn:hover:not(:disabled),
    .filter-btn:focus:not(:disabled) {
      border-color: #888;
    }
    .filter-btn.active {
      background: #007bfc;
      color: #fff;
      font-weight: bold;
    }
    .filter-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }
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
