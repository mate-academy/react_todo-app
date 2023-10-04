import { Action, State, Status } from './Types';

export function reducer(state: State, { type, payload }: Action): State {
  const { todos } = state;

  switch (type) {
    case 'edit':
      return {
        ...state,
        todos: todos.map(todo => {
          if (todo.id === payload.id) {
            return {
              ...todo,
              title: payload.newTitle,
            };
          }

          return todo;
        }),
      };

    case 'markCompleted':
      return {
        ...state,
        todos: todos.map(todo => {
          if (todo.id === payload.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'add':
      return {
        ...state,
        todos: todos.length
          ? [
            ...todos,
            payload.todo,
          ]
          : [payload.todo],
      };

    case 'remove':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload.id),
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: todos.filter(todo => !todo.completed),
      };

    case 'toogleAll':
      return {
        ...state,
        todos: todos.map(todo => {
          if (todos.every(item => item.completed)) {
            return {
              ...todo,
              completed: false,
            };
          }

          return {
            ...todo,
            completed: true,
          };
        }),
      };

    case 'Active':
      return {
        ...state,
        visible: Status.Active,
      };

    case 'Completed':
      return {
        ...state,
        visible: Status.Completed,
      };

    default:
      return {
        ...state,
        visible: Status.All,
      };
  }

  return state;
}
