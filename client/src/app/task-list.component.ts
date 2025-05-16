import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from './todo.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="task-list">
      <li *ngFor="let t of tasks">
        <span>{{ t.title }}</span>
        <span [class.completed]="t.completed">
          {{ t.completed ? 'Done' : 'Pending' }}
        </span>
      </li>
    </ul>
  `,
  styles: [`
    .task-list { list-style: none; padding: 0; }
    .task-list li { display: flex; justify-content: space-between; padding: .5rem 0; }
    .completed { color: green; }
  `]
})
export class TaskListComponent {
  @Input() tasks: Todo[] = [];
}
