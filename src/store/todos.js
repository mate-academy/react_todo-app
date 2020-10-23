
export const addTodo = title => ({
  type: 'ADD_TODO',
  payload: {
    id: +new Date(),
    title,
    completed: false,
  },
});

export const toggleAllTodos = (todos, completed) => ({
  type: 'TOGGLE_ALL',
  payload:
    [...todos].map((todo) => {
      if (todo.completed === completed) {
        return todo;
      }

      return { ...todo, completed };
    }),
});

const SET_TODOS = 'todos/SET_TODOS';

export const setTodos = todos => ({
  type: SET_TODOS,
  payload: todos,
});

export default (todos = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...todos,
        action.payload,
      ];

    case 'TOGGLE_ALL':
    case SET_TODOS:
      return action.payload;

    default:
      return todos;
  }
};
