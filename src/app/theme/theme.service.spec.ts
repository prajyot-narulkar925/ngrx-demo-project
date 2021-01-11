import { TestBed } from '@angular/core/testing';
import { dark, light } from './theme';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemeService = TestBed.get(ThemeService);
    expect(service).toBeTruthy();
  });

});
