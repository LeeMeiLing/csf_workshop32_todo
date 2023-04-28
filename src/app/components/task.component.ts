import { Component, Input, Output } from '@angular/core';
import { task } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input()
  task!:task

  @Output()
  onEdit = new Subject<task>

  @Output()
  onDelete = new Subject<task>

  isCompleted = false

  markComplete(){
    this.isCompleted=true
  }

  edit(){
    this.onEdit.next(this.task)
  }

  delete(){
    this.onDelete.next(this.task)
  }
}
