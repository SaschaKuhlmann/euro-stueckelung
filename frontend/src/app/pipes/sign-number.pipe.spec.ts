import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SignNumberPipe } from './sign-number.pipe';

describe('SignNumberPipe', () => {
  let pipe: SignNumberPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignNumberPipe, provideZonelessChangeDetection()],
    });

    pipe = TestBed.inject(SignNumberPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should add a + sign to a positive number', () => {
    const result = pipe.transform(12345);
    expect(result).toBe('+12345');
  });

  it('should add a - sign to a negative number', () => {
    const result = pipe.transform(-12345);
    expect(result).toBe('-12345');
  });
});
