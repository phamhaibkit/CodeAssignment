import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from '../backend.service';

import { TaskListComponent } from './task-list.component';

class MockUserService {
  tasks = () => [];
  users = () => [];
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: BackendService, useClass: MockUserService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Tasks managing application'`, () => {
    expect(component.title).toEqual('Tasks managing application');
  });

  it(`should have a task list`, () => {
    expect(component.tasks.length).toEqual(0);
  });
});
