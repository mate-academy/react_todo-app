const SET_TODOS = 'todos/SET_TODOS';
const ADD_TODO = 'todos/ADD_TODO';
const DELETE_TODO = 'todos/DELETE';
const RENAME_TODO = 'todos/RENAME_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

export const setTodos = todos => ({
  type: SET_TODOS,
  payload: todos,
});

export const addTodo = title => ({
  type: ADD_TODO,
  payload: {
    id: +new Date(),
    title,
    completed: false,
  },
});

export const toggleAllTodos = completed => ({
  type: 'TOGGLE_ALL',
  payload: completed,
});

export const setDeleteTodo = todoId => ({
  type: DELETE_TODO,
  payload: todoId,
});

export const renameTodo = (todoId, title) => ({
  type: RENAME_TODO,
  payload: { todoId, title },
});

export const toggleTodo = todoId => ({
  type: TOGGLE_TODO,
  payload: todoId,
});

export const clearCompleted = () => ({
  type: CLEAR_COMPLETED,
});

export default (todos = [], action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;

    case ADD_TODO:
      return [
        ...todos,
        action.payload,
      ];

    case 'TOGGLE_ALL':
      return todos.map((todo) => {
        const completed = action.payload;

        if (todo.completed === completed) {
          return todo;
        }

        return { ...todo, completed };
      });

    case DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload);

    case RENAME_TODO:
      return todos.map((todo) => {
        if (todo.id !== action.payload.todoId) {
          return todo;
        }

        return {
          ...todo,
          title: action.payload.title,
        };
      });

    case TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });

    case CLEAR_COMPLETED:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
};
