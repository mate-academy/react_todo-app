import { Action } from '../../types/Action';
import { ToDo } from '../../types/ToDo';

const updateToDo = (todos: ToDo[], id: number, update: Partial<ToDo>) => {
  return todos.map(todo => (todo.id === id ? { ...todo, ...update } : todo));
};

const filterToDos = (todos: ToDo[], predicate: (todo: ToDo) => boolean) => {
  return todos.filter(predicate);
};

const ToDoReducer = (state: ToDo[], action: Action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'COMPLETE_TODO':
      return updateToDo(state, action.item, { completed: action.payload });
    case 'TOGGLE_ALL':
      return state.map(todo => ({ ...todo, completed: action.payload }));
    case 'CLEAR_COMPLETED_TODOS':
      return filterToDos(state, todo => !todo.completed);
    case 'CLEAR_TODO':
      return filterToDos(state, todo => todo.id !== action.payload);
    case 'EDIT_TODO':
      return updateToDo(state, action.payload, { title: action.editTitle });
    case 'EMPTY_TODO':
      return filterToDos(state, todo => todo.id !== action.payload);
    default:
      return state;
  }
};

export default ToDoReducer;
