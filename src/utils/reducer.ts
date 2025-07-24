import { ActionType } from '../constants/ActionType';
import { Action } from '../types/Action';
import { RootState } from '../types/RootState';

export const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case ActionType.Add:
      return {
        ...state,
        todos: [...state.todos, action.newTodo],
      };

    case ActionType.Update:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.updatedTodo.id ? action.updatedTodo : todo,
        ),
      };

    case ActionType.Delete:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };

    case ActionType.DeleteCompleted:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case ActionType.Toggle:
      const updatedTodosMap = new Map(
        action.updatedTodos.map(todo => [todo.id, todo]),
      );

      return {
        ...state,
        todos: state.todos.map(todo => updatedTodosMap.get(todo.id) ?? todo),
      };

    default:
      return state;
  }
};
