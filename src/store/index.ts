import {
  configureStore,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';
import { State, Todo } from '../react-app-env';

import { ShowType } from '../types/ShowType';

const inititalState: State = {
  todoList: [],
  showBy: ShowType.ALL,
};

export const addTodo = createAction<Todo>('ADD_TODO');

export const setNewTodos = createAction<Todo[]>('SET_NEW_ARR');

export const destroyTodo = createAction<number>('DESTROY_TODO');

export const completeTodo = createAction<number>('COMPLETE_TODO');

export const setShowBy = createAction<ShowType>('SET_SHOWBY');

const reducer = createReducer(inititalState, (builder) => {
  builder.addCase(addTodo, ({ todoList }, { payload }) => {
    todoList?.push(payload);
  }),

  builder.addCase(destroyTodo, ({ todoList }, { payload }) => {
    if (todoList) {
      todoList.splice(todoList.findIndex(todo => todo.id === payload), 1);
    }
  }),

  builder.addCase(completeTodo, ({ todoList }, { payload }) => {
    if (todoList) {
      todoList = todoList.map((todo) => {
        if (todo.id === payload) {
          todo.completed = !todo.completed;
        }

        return todo;
      });
    }
  }),

  builder.addCase(setShowBy, (state, { payload }) => {
    state.showBy = payload;
  }),

  builder.addCase(setNewTodos, (state, action) => {
    state.todoList = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
