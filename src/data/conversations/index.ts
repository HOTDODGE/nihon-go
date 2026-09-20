import type { ConversationScenario } from '../../types';
import { CONVERSATIONS_N5 } from './n5';
import { CONVERSATIONS_N4 } from './n4';
import { CONVERSATIONS_N3 } from './n3';
import { CONVERSATIONS_N2 } from './n2';
import { CONVERSATIONS_N1 } from './n1';

export const CONVERSATIONS: ConversationScenario[] = [
  ...CONVERSATIONS_N5,
  ...CONVERSATIONS_N4,
  ...CONVERSATIONS_N3,
  ...CONVERSATIONS_N2,
  ...CONVERSATIONS_N1,
];
