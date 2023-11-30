import { State } from '../types/State';
import { Action } from '../types/Action';

export const stateReducer = (state: State, action: Action): State => {
  let todos = [...state.todos];

  switch (action.type) {
    case 'addTodo':
      todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(todos));

      return {
        ...state,
        todos,
      };

    case 'editTodo':
      todos = state.todos.map(todo => (
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      ));
      localStorage.setItem('todos', JSON.stringify(todos));

      return {
        ...state,
        todos,
      };

    case 'deleteTodo':
      todos = state.todos.filter(todo => todo.id !== action.payload.id);
      localStorage.setItem('todos', JSON.stringify(todos));

      return {
        ...state,
        todos,
      };

    case 'clearCompleted':
      todos = state.todos.filter(todo => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(todos));

      return {
        ...state,
        todos,
      };

    case 'toggleCompletion':
      todos = state.todos.map(todo => (
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      ));
      localStorage.setItem('todos', JSON.stringify(todos));

      return {
        ...state,
        todos,
      };

    case 'toggleAllCompletions':
      todos = state.todos.every(todo => todo.completed)
        ? state.todos.map(todo => ({ ...todo, completed: false }))
        : state.todos.map(todo => ({ ...todo, completed: true }));
      localStorage.setItem('todos', JSON.stringify(todos));

      return {
        ...state,
        todos,
      };

    case 'setFilter':
      localStorage.setItem('filter', JSON.stringify(action.payload));

      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};
