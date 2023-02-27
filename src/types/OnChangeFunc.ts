import { Todo } from './Todo';

export type OnChangeFunc = <K extends keyof Todo>(
  todoId: number,
  propName: K,
  newPropValue: Todo[K],
  onError?: () => void,
) => void;
