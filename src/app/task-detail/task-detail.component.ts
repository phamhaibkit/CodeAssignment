import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { iUser } from '../interface';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})

export class TaskDetailComponent implements OnInit {
  users: iUser[] = [];
  taskForm: any;
  id = '-1';
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private backend: BackendService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.taskForm = this.fb.group({
      description: new FormControl('', Validators.required),
      assigneeId: new FormControl(''),
      completed: new FormControl(false)
    })
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: any = params.get('id');
      this.id = id;
      if (id !== '-1') {
        forkJoin([this.backend.users(), this.backend.task(id)]).subscribe((data) => {
          const newUsers = data[0];
          newUsers.forEach((item => {
            this.users.push({label: item.name, value: item.id})
          }))
          const userIndex: any = newUsers.findIndex((eachUser) => eachUser.id === data[1].assigneeId);
          this.taskForm.controls['description'].setValue(data[1].description);
          this.taskForm.controls['assigneeId'].setValue(newUsers[userIndex]?.id);
          this.taskForm.controls['completed'].setValue(data[1].completed);
          this.loading = false;
        })
      } else {
        this.backend.users().subscribe((data) => {
          data.forEach((item => {
            this.users.push({label: item.name, value: item.id})
          }))
          this.loading = false;
        })
      }
    });
  }

  onCancel = () => {
    this.router.navigate([`/task-list`])
  }

  onSave = () => {
    if(this.taskForm.invalid) {
      this.taskForm.setErrors({ ...this.taskForm.errors, 'test': true });
      return;
    }
    if (this.id !== '-1') {
      this.backend.update(parseInt(this.id), this.taskForm.value).subscribe((res) => {
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Update successful!'});
      })
    } else {
      const payload = {
        description: this.taskForm.value.description,
        assigneeId: this.taskForm.value.assigneeId
      }
      this.backend.newTask(payload).subscribe((res) => {
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Add successful!'});
      })
    }
  }

}
