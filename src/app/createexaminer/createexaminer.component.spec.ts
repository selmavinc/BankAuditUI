import { ComponentFixture, TestBed } from '@angular/core/testing';
import { auditServices } from '../services/audit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CreateexaminerComponent } from './createexaminer.component';

describe('CreateexaminerComponent', () => {
  let component: CreateexaminerComponent;
  let fixture: ComponentFixture<CreateexaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateexaminerComponent ],
      providers: [
        auditServices
      ],
      imports: [
        // Router,
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
        
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateexaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
