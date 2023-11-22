import { State } from './State';
import { Todo } from './Todo';

export type Action =
  | { type: State.ADDED; id: number; title: string; }
  | { type: State.EDIT; task: Todo }
  | { type: State.DELETED; id: number }
  | { type: State.TOGGLE_ALL; completed: boolean }
  | { type: State.CLEAR_COMPLETED; completed: boolean };
