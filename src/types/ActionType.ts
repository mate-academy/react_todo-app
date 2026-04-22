import { FilterEnum } from './FilterEnum';
import { TodosType } from './TodosInterface';

export type Action =
  | { type: 'add'; title: string }
  | { type: 'update'; currentTodo: TodosType; newTitle: string }
  | { type: 'delete'; todoID: number }
  | { type: 'complete'; todoID: number }
  | { type: 'deleteCompleted' }
  | { type: 'completeAll' }
  | { type: 'filter'; filterType: FilterEnum };
