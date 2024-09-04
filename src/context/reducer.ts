import { getTodos } from '../api/todos';
import { Action } from '../types/Action';
import { ActionTypes } from '../types/ActionTypes';
import { Todo } from '../types/Todo';

export function reducer(todos: Todo[], action: Action) {
  switch (action.type) {
    case ActionTypes.onGet:
      return getTodos();
    case ActionTypes.onAdd:
      return [...todos, action.payload];
    case ActionTypes.onUpdate:
      return todos.map(todo => {
        if (action.payload.id === todo.id) {
          return action.payload;
        }

        return todo;
      });
    case ActionTypes.onDelete:
      return todos.filter(todo => todo.id !== action.payload.id);
    default:
      return todos;
  }
}
