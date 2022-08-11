/* eslint-disable no-param-reassign */
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { State, Todo } from '../react-app-env';

export enum FilterBy {
  ALL_TODOS = 'ALL_TODOS',
  ACTIVE_TODOS = 'ACTIVE_TODOS',
  COMPLETED_TODOS = 'COMPLETED_TODOS',
}

enum ActionType {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  ALL_TODOS_FINISHED = 'ALL_TODOS_FINISHED',
  ALL_TODOS_UNFINISHED = 'ALL_TODOS_UNFINISHED',
  FILTER_BY = 'FILTER_BY',
  DELETE_TODO = 'DELETE_TODO',
  DELETE_COMLETED = 'DELETE_COMPLETED',
  CHANGE_TODO = 'CHANGE_TODO',
}

interface EditTodoPayload {
  id: number,
  todoTitle: string,
}

const initialState: State = {
  todos: [],
  filterBy: FilterBy.ALL_TODOS,
};

export const setTodosAction = createAction<Todo[]>(ActionType.SET_TODOS);
export const addTodoAction = createAction<Todo>(ActionType.ADD_TODO);
export const toggleTodoAction
  = createAction<number>(ActionType.TOGGLE_TODO);
export const setAllFinished = createAction(ActionType.ALL_TODOS_FINISHED);
export const setAllUnfinished = createAction(ActionType.ALL_TODOS_UNFINISHED);
export const setFilterBy = createAction<FilterBy>(ActionType.FILTER_BY);
export const deleteTodo = createAction<number>(ActionType.DELETE_TODO);
export const deleteCompleted = createAction(ActionType.DELETE_COMLETED);
export const editTodo
  = createAction<EditTodoPayload>(ActionType.CHANGE_TODO);

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setTodosAction, (state, action) => {
    state.todos = action.payload;
  });

  builder.addCase(addTodoAction, (state, action) => {
    state.todos.push(action.payload);
  });

  builder.addCase(toggleTodoAction, (state, action) => {
    state.todos = state.todos.map(todo => {
      if (todo.id === action.payload) {
        todo.completed = !todo.completed;
      }

      return todo;
    });
  });

  builder.addCase(setAllFinished, (state) => {
    state.todos = state.todos.map(todo => {
      todo.completed = true;

      return todo;
    });
  });

  builder.addCase(setAllUnfinished, (state) => {
    state.todos = state.todos.map(todo => {
      todo.completed = false;

      return todo;
    });
  });

  builder.addCase(setFilterBy, (state, action) => {
    state.filterBy = action.payload;
  });

  builder.addCase(deleteTodo, (state, action) => {
    state.todos = state.todos.filter(todo => todo.id !== action.payload);
  });

  builder.addCase(deleteCompleted, (state) => {
    state.todos = state.todos.filter(todo => !todo.completed);
  });

  builder.addCase(editTodo, (state, { payload }) => {
    state.todos = state.todos.map(todo => {
      if (todo.id === payload.id) {
        todo.title = payload.todoTitle;
      }

      return todo;
    });
  });
});

export const store = configureStore({ reducer });
