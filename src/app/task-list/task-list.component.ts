import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { BackendService } from '../backend.service';
import { uTask } from '../interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  title="Tasks managing application"
  tasks: uTask[] = [];
  loading = true;
  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  ngOnInit() {
    forkJoin([this.backend.users(), this.backend.tasks()]).subscribe((data) => {
      const newUsers = data[0];
      const newTasks: any = data[1]
      if (Array.isArray(data[1])) {
        newTasks.map((item: any) => {
          const userIndex: any = newUsers.findIndex((eachUser) => eachUser.id === item.assigneeId);
          if (userIndex !== -1) {
            item.assignee = newUsers[userIndex].name;
          }
        })
        this.tasks = newTasks;
        this.loading = false;
      }
    })
  }

  onDetail = (id: number) => {
    this.router.navigate([`/task-list/${id}`])
  }

}
