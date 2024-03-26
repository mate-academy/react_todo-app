/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';
import {
  addTodo, deleteTodo, getTodos, updateTodo,
} from '../../api/todos';

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

type State = {
  todos: Todo[];
  status: Status
  isUpdating: boolean;
};

const initialState: State = {
  todos: [],
  status: Status.All,
  isUpdating: false,
};

// #region Async Reducers
export const initTodosAsync = createAsyncThunk('todos/fetch', (id: number) => {
  return getTodos(id);
});

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async ({ userId, title }: { userId: number; title: string }) => {
    return addTodo(userId, title);
  },
);

export const deleteTodosAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number | number[]) => {
    if (Array.isArray(id)) {
      await Promise.all(id.map((todoId) => deleteTodo(todoId)));
    } else {
      await deleteTodo(id);
    }

    return id;
  },
);

export const updateTodosAsync = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, changes }: { id: number; changes: Partial<Todo> }) => {
    await updateTodo(id, changes);

    return { id, changes };
  },
);
// #endregion

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.isUpdating = false;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initTodosAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(
        initTodosAsync.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload;
          state.isUpdating = false;
        },
      )
      .addCase(addTodoAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.isUpdating = false;
      })
      .addCase(deleteTodosAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(deleteTodosAsync.fulfilled, (state, action) => {
        const deletedIds = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        state.todos = state.todos.filter(
          (todo) => !deletedIds.includes(todo.id),
        );
        state.isUpdating = false;
      })
      .addCase(updateTodosAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateTodosAsync.fulfilled, (state, action) => {
        const { id, changes } = action.payload;

        state.todos = state.todos
          .map((todo) => (todo.id === id ? { ...todo, ...changes } : todo));
        state.isUpdating = false;
      });
  },
});

export default todosSlice.reducer;
export const { setTodos, setStatus } = todosSlice.actions;
