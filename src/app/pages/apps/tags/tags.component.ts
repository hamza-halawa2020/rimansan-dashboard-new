import { Component, ViewChild } from '@angular/core';

import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  breadCrumbItems!: Array<{}>;
  todoDatas: any;
  deleteId: any;
  assignList: any;
  todoForm!: UntypedFormGroup;
  submitted = false;
  projectData: any;
  term: any;

  @ViewChild('createProjectModal', { static: false })
  alltodoDatas: any;

  constructor() {}
}
