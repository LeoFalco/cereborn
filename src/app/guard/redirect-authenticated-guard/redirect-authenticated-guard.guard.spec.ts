import { TestBed } from '@angular/core/testing';

import { RedirectAuthenticatedGuardGuard } from './redirect-authenticated-guard.guard';

describe('RedirectAuthenticatedGuardGuard', () => {
  let guard: RedirectAuthenticatedGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectAuthenticatedGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
