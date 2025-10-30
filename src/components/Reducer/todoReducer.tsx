import { Action } from '../../types/Action';
import { Todo } from '../../types/Todo';

export const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'add':
      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload.title,
        completed: false,
      };

      localStorage.setItem('todos', JSON.stringify([...state, newTodo]));

      return [...state, newTodo];

    case 'delete':
      const newState = state.filter(todo => todo.id !== action.payload.id);

      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'clearCompleted':
      const clearCompletedState = state.filter(
        todo => todo.completed === false,
      );

      localStorage.setItem('todos', JSON.stringify(clearCompletedState));

      return clearCompletedState;

    case 'toggleTodo':
      const toggleTodoState = state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

      localStorage.setItem('todos', JSON.stringify(toggleTodoState));

      return toggleTodoState;

    case 'toggle':
      const toggleState = state.every(todo => todo.completed)
        ? state.map(todo => ({ ...todo, completed: false }))
        : state.map(todo => ({ ...todo, completed: true }));

      localStorage.setItem('todos', JSON.stringify(toggleState));

      return toggleState;

    case 'edit':
      const editingTodosState = state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

      localStorage.setItem('todos', JSON.stringify(editingTodosState));

      return editingTodosState;

    default:
      return state;
  }
};
