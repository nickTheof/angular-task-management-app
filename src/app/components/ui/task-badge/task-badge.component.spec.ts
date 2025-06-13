import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBadgeComponent } from './task-badge.component';

describe('TaskBadgeComponent', () => {
  let component: TaskBadgeComponent;
  let fixture: ComponentFixture<TaskBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
