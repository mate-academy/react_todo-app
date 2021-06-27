import {
  COMPLETE_TODO,
  CREATE_TODO,
  DELETE_TODO,
  CLEAR_COMPLETED,
  TOGGLE_ALL,
  CHANGE_TITLE,
} from './types';

export function addTodo(todo) {
  return ({
    type: CREATE_TODO,
    payload: todo,
  });
}

export function deleteTodo(id) {
  return ({
    type: DELETE_TODO,
    payload: id,
  });
}

export function completeTodo(id, value) {
  return ({
    type: COMPLETE_TODO,
    payload: { id, value },
  });
}

export function clearCompleted() {
  return ({
    type: CLEAR_COMPLETED,
  });
}

export function toggleAll(value) {
  return ({
    type: TOGGLE_ALL,
    payload: value,
  });
}

export function changeTitle(id, title) {
  return ({
    type: CHANGE_TITLE,
    payload: { id, title },
  });
}
