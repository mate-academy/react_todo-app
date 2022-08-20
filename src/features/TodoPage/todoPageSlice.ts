import {
  createAsyncThunk,
  createSlice, isFulfilled,
  isPending, isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';

import * as todosApi from '../../api/todos';

import Todo, { TodoPatch } from '../../types/Todo';
import LoadingStatus from '../../enums/LoadingStatus';
import type { RootState } from '../../app/store';

export interface TodosState {
  todos: Todo[];
  status: `${LoadingStatus}`;
}

const initialState: TodosState = {
  todos: [],
  status: LoadingStatus.Idle,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await todosApi.getTodos();

    return response;
  },
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo: Omit<Todo, 'id'>) => {
    const response = await todosApi.createTodo(todo);

    return response;
  },
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo: TodoPatch) => {
    const response = await todosApi.patchTodo(todo);

    return response;
  },
);

export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async (todoId: number) => {
    await todosApi.deleteTodo(todoId);

    return todoId;
  },
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(
          todo => todo.id === action.payload.id,
        );

        state.todos[index] = action.payload;
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addMatcher(
        isFulfilled(fetchTodos, addTodo, updateTodo, removeTodo),
        (state) => {
          state.status = LoadingStatus.Idle;
        },
      )
      .addMatcher(
        isPending(fetchTodos, addTodo, updateTodo, removeTodo),
        (state) => {
          state.status = LoadingStatus.Loading;
        },
      )
      .addMatcher(
        isRejected(fetchTodos, addTodo, updateTodo, removeTodo),
        (state) => {
          state.status = LoadingStatus.Failed;
        },
      );
  },
});

export const todosSelector = (state: RootState) => (
  state.todos
);

export default todosSlice.reducer;
