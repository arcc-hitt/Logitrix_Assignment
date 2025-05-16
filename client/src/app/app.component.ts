import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService, Todo } from './todo.service';
import { TaskFilterComponent } from './task-filter.component';
import { TaskListComponent } from './task-list.component';
import { PaginationComponent } from './pagination.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaskFilterComponent,
    TaskListComponent,
    PaginationComponent
  ],
  template: `
    <div class="container">
      <h1>Task List</h1>
      <app-task-filter
        [filters]="['All','Pending','Completed']"
        [active]="activeFilter"
        (filterChange)="onFilterChange($event)"
      ></app-task-filter>

      <app-task-list [tasks]="paginatedTasks"></app-task-list>

      <app-pagination
        [currentPage]="currentPage"
        [pageSize]="pageSize"
        [totalItems]="filteredTasks.length"
        (pageChange)="onPageChange($event)"
      ></app-pagination>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 2rem auto; padding: 1rem; }
    h1 { text-align: center; margin-bottom: 1.5rem; }
  `],
})
export class AppComponent implements OnInit {
  allTasks: Todo[] = [];
  filteredTasks: Todo[] = [];
  paginatedTasks: Todo[] = [];

  activeFilter = 'All';
  currentPage = 1;
  pageSize = 10;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.fetchTodos().subscribe(todos => {
      this.allTasks = todos;
      this.applyFilterAndPagination();
    });
  }

  onFilterChange(filter: string) {
    this.activeFilter = filter;
    this.currentPage = 1;
    this.applyFilterAndPagination();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.applyFilterAndPagination();
  }

  private applyFilterAndPagination() {
    this.filteredTasks = this.allTasks.filter(t => {
      return this.activeFilter === 'All' ||
             (this.activeFilter === 'Pending' && !t.completed) ||
             (this.activeFilter === 'Completed' && t.completed);
    });
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedTasks = this.filteredTasks.slice(start, start + this.pageSize);
  }
}


// Code used in Part 1

// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   FormArray,
//   Validators,
//   AbstractControl,
//   ValidationErrors,
//   ValidatorFn,
//   ReactiveFormsModule
// } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule
//   ],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   userForm!: FormGroup;
//   submittedData: any = null;

//   adminRoles = ['SuperAdmin', 'GroupAdmin', 'Viewer'];
//   allPermissions = ['Read', 'Write', 'Delete', 'Modify Settings'];
//   subscriptionTypes = ['Free', 'Basic', 'Premium'];

//   constructor(private fb: FormBuilder) {}

//   ngOnInit() {
//     this.userForm = this.fb.group({
//       userType: ['', Validators.required],
//       details: this.fb.group({})
//     });

//     this.userForm.get('userType')!.valueChanges.subscribe(type => {
//       this.setDynamicFields(type);
//     });
//   }

//   private setDynamicFields(type: string) {
//     const details = this.fb.group({});
//     if (type === 'Admin') {
//       details.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
//       details.addControl('role', this.fb.control('', Validators.required));
//       const permsArr = this.fb.array(
//         this.allPermissions.map(() => this.fb.control(false)),
//         this.minSelectedCheckboxes(1)
//       );
//       details.addControl('permissions', permsArr);
//     } else if (type === 'Guest') {
//       details.addControl('name', this.fb.control('', Validators.required));
//       details.addControl('visitReason', this.fb.control('', Validators.required));
//       details.addControl('visitDate', this.fb.control('', Validators.required));
//     } else if (type === 'Subscriber') {
//       details.addControl('name', this.fb.control('', Validators.required));
//       details.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
//       details.addControl('subscriptionType', this.fb.control('', Validators.required));
//     }
//     this.userForm.setControl('details', details);
//   }

//   private minSelectedCheckboxes(minRequired: number): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       const fa = control as FormArray;
//       const total = fa.controls.filter(c => c.value).length;
//       return total >= minRequired ? null : { required: true };
//     };
//   }

//   get detailsGroup() {
//     return this.userForm.get('details') as FormGroup;
//   }
//   get permissionsArray() {
//     return this.detailsGroup.get('permissions') as FormArray;
//   }

//   onSubmit() {
//     if (this.userForm.valid) {
//       const raw = this.userForm.value;
//       if (raw.userType === 'Admin') {
//         raw.details.permissions = this.allPermissions
//           .filter((_, i) => raw.details.permissions[i]);
//       }
//       this.submittedData = raw;
//     } else {
//       this.userForm.markAllAsTouched();
//       this.submittedData = null;
//     }
//   }
// }
