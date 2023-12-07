import { Todo } from '../types/Todo';
import { Action } from '../types/Action';

export const todoReducer = (state: Todo[], action: Action) => {
  const todoLeft = state.map(todo => todo.completed === false).length;

  switch (action.type) {
    case 'addTodo':
      return [
        ...state,
        {
          id: +(Date.now()),
          title: action.title,
          completed: false,
        },
      ];

    case 'destroyTodo':
      return state.filter(todo => todo.id !== action.todoId);

    case 'destroyCompletedTodo':
      return state.filter(todo => todo.completed === false);

    case 'toggleTodoStatus':
      return state.map(item => (
        item.id === action.todoId
          ? { ...item, completed: !item.completed }
          : item
      ));

    case 'toggleAllTodoStatus':
      return state.map(item => {
        return {
          ...item,
          completed: todoLeft > 0,
        };
      });

    case 'editTodo':
      return state.map(item => (
        item.id === action.todoId
          ? { ...item, title: action.newTitle }
          : item
      ));

    case 'setInitialTodoList':
      return [...action.todoList];

    default:
      return state;
  }
};
