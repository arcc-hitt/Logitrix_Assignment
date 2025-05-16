import { Injectable } from '@angular/core';
import { Todo } from './todo.service';
import { Subject, interval } from 'rxjs';

// Simulates real‑time updates: every 5s emits a new or toggled Todo
@Injectable({ providedIn: 'root' })
export class TaskUpdateService {
  private updates$ = new Subject<Todo>();
  private nextId = 201;  // JSONPlaceholder has IDs 1–200

  constructor() {
    interval(5000).subscribe(() => {
      const isNew = Math.random() < 0.5;
      let update: Todo;

      if (isNew) {
        // Create a new task
        update = {
          userId: 1,
          id: this.nextId++,
          title: `Real‑time task #${this.nextId}`,
          completed: false
        };
      } else {
        // Toggle an existing random task
        const existingId = Math.floor(Math.random() * 200) + 1;
        update = {
          userId: 1,
          id: existingId,
          title: `Toggled task #${existingId}`,
          completed: Math.random() < 0.5
        };
      }

      this.updates$.next(update);
    });
  }

  /** Observable stream of individual task updates */
  getUpdates() {
    return this.updates$.asObservable();
  }
}
