import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPokeComponent } from './detail-poke.component';

describe('DetailPokeComponent', () => {
  let component: DetailPokeComponent;
  let fixture: ComponentFixture<DetailPokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPokeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
