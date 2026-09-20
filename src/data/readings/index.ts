import type { ReadingPassage } from '../../types';
import { READINGS_N5 } from './n5';
import { READINGS_N4 } from './n4';
import { READINGS_N3 } from './n3';
import { READINGS_N2 } from './n2';
import { READINGS_N1 } from './n1';

export const READINGS: ReadingPassage[] = [
  ...READINGS_N5,
  ...READINGS_N4,
  ...READINGS_N3,
  ...READINGS_N2,
  ...READINGS_N1,
];

export { READINGS_N5, READINGS_N4, READINGS_N3, READINGS_N2, READINGS_N1 };
