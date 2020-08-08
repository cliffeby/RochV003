import { TestBed } from '@angular/core/testing';

import { MatchScoreService } from './matchscore.service';

describe('MatchscoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchScoreService = TestBed.get(MatchScoreService);
    expect(service).toBeTruthy();
  });
});
