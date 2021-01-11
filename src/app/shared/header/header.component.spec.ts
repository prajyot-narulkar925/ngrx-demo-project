import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ThemeService } from 'src/app/theme/theme.service';
import { dark, light } from 'src/app/theme/theme';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  const initialState = { loggedIn: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers:[ provideMockStore({ initialState }),]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should change theme to dark",()=>{
    const themeService:ThemeService =  TestBed.get(ThemeService);
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;

    themeService.setActiveTheme(dark);
    app.toggleTheme();

    expect(themeService.getActiveTheme()).toEqual(light);
  });

  it("should change theme to light",()=>{
    const themeService:ThemeService =  TestBed.get(ThemeService);
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;

    themeService.setActiveTheme(light);
    app.toggleTheme();

    expect(themeService.getActiveTheme()).toEqual(dark);
  })
});
