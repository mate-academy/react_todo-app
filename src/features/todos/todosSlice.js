import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.todos.push(newTodo);
    },

    changeTodoStatus: (state, action) => {
      const todoId = action.payload;
      const todoToChange = state.todos.find(todo => todo.id === todoId);

      todoToChange.completed = !todoToChange.completed;
    },

    changeTodoTitle: (state, action) => {
      const todoToChange = action.payload;
      const todoForUpdate
        = state.todos.find(todo => todo.id === todoToChange.id);

      todoForUpdate.title = todoToChange.title;
    },

    changeAllTodosStatus: (state) => {
      if (state.todos.some(todo => todo.completed === false)) {
        // eslint-disable-next-line no-param-reassign
        state.todos = state.todos.map(todo => ({ ...todo, completed: true }));
      } else {
        // eslint-disable-next-line no-param-reassign
        state.todos = state.todos.map(todo => (
          { ...todo, completed: !todo.completed }
        ));
      }
    },

    deleteTodo: (state, action) => {
      const todoId = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.todos = state.todos.filter(todo => todo.id !== todoId);
    },
  },

});

export const {
  addTodo,
  deleteTodo,
  changeTodoStatus,
  changeTodoTitle,
  changeAllTodosStatus,
} = todosSlice.actions;

export default todosSlice.reducer;
