const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const DELETE_COMPLETED = 'DELETE_COMPLETED';
const CHANGE_COMPLETED_TODO = 'CHANGE_COMPLETED_TODO';
const CHANGE_COMPLETED_ALL = 'CHANGE_COMPLETED_ALL';
const CHANGE_TITLE = 'CHANGE_TITLE';

export const addTodo = title => ({ type: ADD_TODO, title });
export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });
export const deleteCompletedTodos = () => ({ type: DELETE_COMPLETED });
export const changeTitle = (title, todoId) => ({
  type: CHANGE_TITLE,
  title,
  todoId,
});
export const changeCompletedAll = isAllCompleted => ({
  type: CHANGE_COMPLETED_ALL,
  isAllCompleted,
});
export const changeCompletedTodo = todoId => ({
  type: CHANGE_COMPLETED_TODO,
  todoId,
});

export const getTodos = state => state.todos;
export const getActiveTodos = state => (
  state.todos.filter(todo => !todo.completed)
);
export const getCompletedTodos = state => (
  state.todos.filter(todo => todo.completed)
);

export const getActiveTodosLength = state => (
  state.todos.filter(todo => !todo.completed).length
);
export const isAllCompleted = state => (
  state.todos.every(todo => todo.completed)
);

const initialState = {
  todos: [],
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: +new Date(),
          title: action.title,
          completed: false,
        }],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };

    case DELETE_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case CHANGE_COMPLETED_TODO:
      return {
        ...state,
        todos: [...state.todos.map((todo) => {
          if (todo.id === action.todoId) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        })],
      };

    case CHANGE_COMPLETED_ALL:
      return {
        ...state,
        todos: [...state.todos.map(todo => ({
          ...todo,
          completed: action.isAllCompleted,
        }))],
      };

    case CHANGE_TITLE:
      return {
        ...state,
        todos: [...state.todos.map((todo) => {
          if (todo.id !== action.todoId) {
            return todo;
          }

          return { ...todo, title: action.title };
        })],
      };

    default:
      return state;
  }
};
