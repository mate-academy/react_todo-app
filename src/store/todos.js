
export const addTodo = title => ({
  type: 'ADD_TODO',
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
      return todos.map((todo) => {
        const completed = action.payload;

        if (todo.completed === completed) {
          return todo;
        }

        return { ...todo, completed };
      });

    case SET_TODOS:
      return action.payload;

    default:
      return todos;
  }
};
