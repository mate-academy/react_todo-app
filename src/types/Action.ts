import { Todo } from './Todo';
import { ActionTypes } from './ActionTypes';
import { FilterOption } from './FilterOption';

export type Action = {
  type: ActionTypes.AddTodo,
  payload: Todo,
}
| {
  type: ActionTypes.DeleteTodo,
  payload: number,
}
| {
  type: ActionTypes.ToggleCompleted,
  payload: number,
}
| {
  type: ActionTypes.ToggleAllTodos,
  payload: {
    isChecked: boolean,
  },
}
| {
  type: ActionTypes.ChangeFilter,
  payload: FilterOption,
}
| {
  type: ActionTypes.ClearCompleted,
}
| {
  type: ActionTypes.SaveChanges,
  payload: Todo,
};
