import { v4 } from 'node-uuid';

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const CHANGE_TODO_TITLE = 'CHANGE_TODO_TITLE';
const TOGLE_COMPLETE_TODO = 'COMPLETE_TODO';
const TOGLE_ALL_COMPLETE = 'TOGLE_TODOS';
const DELETE_ALL_COMPLETED = 'DELETE_ALL_COMPLETED';

export const addTodo = title => ({
  type: ADD_TODO,
  title,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
});

export const togleCompleteTodo = id => ({
  type: TOGLE_COMPLETE_TODO,
  id,
});

export const togleAllComplete = () => ({
  type: TOGLE_ALL_COMPLETE,
});

export const deleteAllCompleted = () => ({
  type: DELETE_ALL_COMPLETED,
});

export const changeTodoTitle = (id, title) => ({
  type: CHANGE_TODO_TITLE,
  id,
  title,
});

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO: {
      const todos = [...state];

      const newTodo = {
        id: v4(),
        title: action.title,
        completed: false,
      };

      return [...todos, newTodo];
    }

    case DELETE_TODO: {
      const todos = [...state];
      const newTodos = [];

      todos.forEach((todo) => {
        if (todo.id !== action.id) {
          newTodos.push(todo);
        }
      });

      return newTodos;
    }

    case TOGLE_COMPLETE_TODO: {
      let todos = [...state];

      todos = todos.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

      return todos;
    }

    case TOGLE_ALL_COMPLETE: {
      let todos = [...state];
      const completedCount = countCompletedTodos(todos);

      todos = todos.map(todo => ({
        ...todo,
        completed: completedCount !== todos.length,
      }));

      return todos;
    }

    case DELETE_ALL_COMPLETED: {
      let todos = [...state];

      todos = todos.filter(todo => !todo.completed);

      return todos;
    }

    case CHANGE_TODO_TITLE: {
      let todos = [...state];
      const { id, title } = action;
      console.log(title);
      todos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
          };
        }

        return todo;
      });

      return todos;
    }

    default: return state;
  }
};

export default todosReducer;

// Cелекторы
export const countCompletedTodos = (state = []) => {
  const completedTodos = state.filter(todo => todo.completed);
  return completedTodos.length;
};

export const filterTodos = (state, filter) => {
  return state.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default: return todo;
    }
  });
};
