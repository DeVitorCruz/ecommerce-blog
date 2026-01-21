import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickListComponent } from './slick-list.component';

describe('SlickListComponent', () => {
  let component: SlickListComponent;
  let fixture: ComponentFixture<SlickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlickListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
