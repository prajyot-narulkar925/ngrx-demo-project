import { TestBed } from '@angular/core/testing';
import { dark, light } from './theme';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemeService = TestBed.get(ThemeService);
    expect(service).toBeTruthy();
  });

  it("should be able to change theme",()=>{
    const themeService:ThemeService =  TestBed.get(ThemeService);

    themeService.setActiveTheme(light);
    expect(themeService.getActiveTheme()).toEqual(light);

    themeService.setActiveTheme(dark);
    expect(themeService.getActiveTheme()).toEqual(dark);
  })

  it("should return the avaliable themes",()=>{
    const themeService:ThemeService =  TestBed.get(ThemeService);

    let themeList = themeService.getAvailableThemes();

    expect(themeList).toContain(dark);
    expect(themeList).toContain(light);
  })

  it("should check if dark theme is selected",()=>{
    const themeService:ThemeService =  TestBed.get(ThemeService);
    themeService.setActiveTheme(dark);
    let isDarkTheme = themeService.isDarkTheme();

    expect(isDarkTheme).toBeTruthy();

  })

  it("should set dark theme",()=>{
    const themeService:ThemeService =  TestBed.get(ThemeService);
    let setTheme = themeService.setDarkTheme();

    expect(setTheme).not.toBe(light);

  })
});
