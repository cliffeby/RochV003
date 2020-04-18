import { TestBed } from '@angular/core/testing';

import { MatchscoreService } from './matchscore.service';

describe('MatchscoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchscoreService = TestBed.get(MatchscoreService);
    expect(service).toBeTruthy();
  });
});
