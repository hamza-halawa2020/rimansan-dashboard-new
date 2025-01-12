import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormArray,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { todoList, AssignedData, projectList } from '../../../core/data/to-do';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

// To Do Component
export class UserComponent {
  breadCrumbItems!: Array<{}>;

  todoDatas: any;
  deleteId: any;
  assignList: any;
  todoForm!: UntypedFormGroup;
  submitted = false;
  projectData: any;
  term: any;

  @ViewChild('createProjectModal', { static: false })
  createProjectModal?: ModalDirective;
  @ViewChild('createTask', { static: false }) createTask?: ModalDirective;
  @ViewChild('removeTaskItemModal', { static: false })
  removeTaskItemModal?: ModalDirective;
  alltodoDatas: any;

  constructor() {}
}
