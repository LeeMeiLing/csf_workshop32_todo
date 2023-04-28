import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { task } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges{

  form! : FormGroup

  @Input()
  taskToEdit!:task

  @Input()
  editMode!:boolean

  @Output()
  onSubmit = new Subject<task>

  constructor(private fb: FormBuilder){
    this.fb = fb
  }
  
  ngOnInit(): void {
    this.form = this.createForm()
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.editMode){
      console.info('>>> on change')
      this.form = this.fb.group({
        description: this.fb.control<string>(this.taskToEdit.description,[Validators.required,Validators.minLength(5)]),
        priority:this.fb.control<string>(this.taskToEdit.priority),
        dueDate:this.fb.control<string>(this.taskToEdit.dueDate.toString(),[Validators.required])
      })
    }
  }

  createForm(): FormGroup{
    return this.fb.group({
      description: this.fb.control<string>('',[Validators.required,Validators.minLength(5)]),
        priority:this.fb.control<string>('low'),
        dueDate:this.fb.control<string>('',[Validators.required])
    })
  }

  isDueDateInvalid(){
    let dd = new Date(this.form.get('dueDate')?.value)

    if(dd < new Date()){
      console.info('>> date invalid: ', true)
      return true
    }
      
    return false
  }
  isFormInvalid():boolean{
    let dd = new Date(this.form.get('dueDate')?.value)

    if((this.form.invalid) || this.isDueDateInvalid()){
      console.info('>> form invalid: ', true)
      return true
    }
      
    return false
    
  }

  submit(){
    // let task = this.form.value
    this.onSubmit.next(this.form.value as task)

  }

}
