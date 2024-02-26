import { Status, StatusAction, Todo, TodoAction } from '../types/TodoApp';

export const todoReducer = (state: Todo[], action: TodoAction) => {
  switch (action.type) {
    case 'addTodo': {
      return [...state, action.payload];
    }

    case 'deleteTodo':
      return state.filter(todo => todo.id !== action.payload);

    case 'updateTodo':
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }

        return todo;
      });

    case 'clearCompletedTodos':
      return state.filter(todo => !todo.completed);

    case 'toggleStatus':
      return state.map(item => {
        if (item.id === action.payload) {
          return { ...item, completed: !item.completed };
        }

        return item;
      });

    case 'toggleStatusAll':
      return state.every(item => item.completed)
        ? state.map(item => Object.assign(item, { completed: false }))
        : state.map(item => Object.assign(item, { completed: true }));

    default:
      return state;
  }
};

export const statusReducer = (state: string, action: StatusAction) => {
  switch (action.type) {
    case Status.Active:
      return Status.Active;

    case Status.Completed:
      return Status.Completed;

    case Status.All:
      return Status.All;

    default:
      return state;
  }
};
