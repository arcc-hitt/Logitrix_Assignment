import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pagination">
      <button (click)="goTo(page)" 
              [disabled]="page === currentPage"
              *ngFor="let page of pages">
        {{ page }}
      </button>
    </nav>
  `,
  styles: [`
    .pagination { display: flex; gap: .5rem; margin-top: 1rem; }
    button { padding: .3rem .6rem; }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  goTo(page: number) {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
