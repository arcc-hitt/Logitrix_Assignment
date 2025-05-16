import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pagination" role="navigation" aria-label="Pagination">
      <button
        class="page-btn"
        [disabled]="currentPage === 1"
        (click)="goTo(1)"
        aria-label="First page">
        « First
      </button>
      <button
        class="page-btn"
        [disabled]="currentPage === 1"
        (click)="goTo(currentPage - 1)"
        aria-label="Previous page">
        ‹ Prev
      </button>

      <ng-container *ngFor="let page of displayPages">
        <button
          *ngIf="page !== '...'; else ellipsis"
          class="page-btn"
          [class.active]="page === currentPage"
          (click)="goTo(page)"
          [attr.aria-current]="page === currentPage ? 'page' : null">
          {{ page }}
        </button>
        <ng-template #ellipsis>
          <span class="ellipsis">…</span>
        </ng-template>
      </ng-container>

      <button
        class="page-btn"
        [disabled]="currentPage === totalPages"
        (click)="goTo(currentPage + 1)"
        aria-label="Next page">
        Next ›
      </button>
      <button
        class="page-btn"
        [disabled]="currentPage === totalPages"
        (click)="goTo(totalPages)"
        aria-label="Last page">
        Last »  
      </button>
    </nav>
  `,
  styles: [`
    .pagination {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
    }
    .page-btn {
      padding: 0.5rem 0.75rem;
      min-width: 2.5rem;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .page-btn:hover:not(:disabled),
    .page-btn:focus:not(:disabled) {
      border-color: #888;
    }
    .page-btn.active {
      background: #007bfc;
      color: #fff;
      font-weight: bold;
    }
    .page-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .ellipsis {
      padding: 0 0.5rem;
      font-size: 1.2rem;
      user-select: none;
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Output() pageChange = new EventEmitter<number>();

  /** Compute total pages */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  /** Build a truncated page list with ellipses */
  get displayPages(): Array<number | '...'> {
    const pages: Array<number | '...'> = [];
    const total = this.totalPages;
    const cp = this.currentPage;

    // Always show first page
    pages.push(1);

    // Show left ellipsis if needed
    if (cp > 4) {
      pages.push('...');
    }

    // Show two pages before current
    for (let p = Math.max(2, cp - 2); p <= Math.min(cp + 2, total - 1); p++) {
      pages.push(p);
    }

    // Show right ellipsis if needed
    if (cp < total - 3) {
      pages.push('...');
    }

    // Always show last page if more than one
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  }

  goTo(page: number | '...') {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
