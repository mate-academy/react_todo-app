import uuid from 'uuid/v4';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

export const addTodo = title => ({
  type: ADD_TODO,
  id: uuid(),
  title,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

export const editTodo = (id, title) => ({
  type: EDIT_TODO,
  id,
  title,
});
