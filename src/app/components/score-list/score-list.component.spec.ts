import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreListComponent } from './score-list.component';
import { FormsModule} from "@angular/forms";
import { SearchFilterPipe} from "../../search.pipe";
import { AuthService} from "../../services/auth.service";
import { AuthHttp} from "angular2-jwt";
import { RouterTestingModule} from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

// Mock our Auth service
export class MockAuthService {
  isAuthenticated() {}
  logout() {}
  userHasScopes() {};
}
export class MockAuthHttp {
  get(){}
};

describe('ScoreListComponent ', () => {
  let component: ScoreListComponent;
  let fixture: ComponentFixture<ScoreListComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreListComponent, SearchFilterPipe ],
      imports: [FormsModule, RouterTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        //   { provide: ScoreService, useClass: MockScoreService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(ScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
