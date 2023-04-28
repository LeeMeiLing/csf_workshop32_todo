import { Component, Input, OnInit, Output } from '@angular/core';
import { task } from './models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  tasks:task[]=[]

  toEdit!:task

  onEdit = false

  ngOnInit(): void {
    
    let taskHistory = localStorage.getItem('tasks')
    if(taskHistory){
      this.tasks = JSON.parse(taskHistory)
      // localStorage.removeItem('tasks')
    }
  }

  processForm(task:task){
    if(this.onEdit){
      console.info('>> to edit: ',this.toEdit) // debug
      let indexToEdit = this.tasks.findIndex( i => i.description == this.toEdit.description && i.dueDate == this.toEdit.dueDate)
      this.tasks.splice(indexToEdit,1,task)
      this.onEdit = false
    }else{
      this.tasks.push(task)
    }

    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    console.info(this.tasks) // debug
  }

  editTask(t:task){
    this.onEdit = true
    this.toEdit=t
  }

  deleteTask(t:task){
    let toDelete = this.tasks.findIndex( (i) => i.description == t.description && i.dueDate == t.dueDate)
    this.tasks.splice(toDelete,1)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    console.info(this.tasks) // debug

  }
}
