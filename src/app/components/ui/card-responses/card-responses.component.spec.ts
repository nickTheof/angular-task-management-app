import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResponsesComponent } from './card-responses.component';

describe('CardResponsesComponent', () => {
  let component: CardResponsesComponent;
  let fixture: ComponentFixture<CardResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardResponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
