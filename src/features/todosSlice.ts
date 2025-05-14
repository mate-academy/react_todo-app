/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Error } from '../types/Error';
import { Todo } from '../types/Todo';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../helpers/handleLocalStorage';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: Error;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: Error.noError,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      if (!action.payload.title.trim()) {
        state.error = Error.emptyTitle;

        return;
      }

      state.todos.push(action.payload);
      saveToLocalStorage(state.todos);
      state.error = Error.noError;
    },

    toggle: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);

      if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage(state.todos);
      }
    },

    toggleAll: state => {
      const allCompleted = state.todos.every(todo => todo.completed);

      state.todos.forEach(todo => {
        todo.completed = !allCompleted;
      });
      saveToLocalStorage(state.todos);
    },
    update: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>,
    ) => {
      const { id, newTitle } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);

      if (todo && newTitle.trim()) {
        todo.title = newTitle.trim();
        saveToLocalStorage(state.todos);
        state.error = Error.noError;
      } else if (!newTitle.trim()) {
        state.error = Error.emptyTitle;
      }
    },

    remove: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      saveToLocalStorage(state.todos);
    },

    removeCompleted: state => {
      state.todos = state.todos.filter(todo => !todo.completed);
      saveToLocalStorage(state.todos);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = Error.loading;
    });
  },
});

export default todosSlice.reducer;
export const { add, toggle, toggleAll, update, remove, removeCompleted } =
  todosSlice.actions;

export const init = createAsyncThunk<Todo[]>('todos/init', async () => {
  return loadFromLocalStorage<Todo[]>();
});

export const selectTodos = (state: { todos: TodosState }) => state.todos.todos;
export const selectUncompletedCount = createSelector(
  [selectTodos],
  todos => todos.filter(todo => !todo.completed).length,
);
