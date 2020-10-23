const SET_TODOS = 'todos/SET_TODOS';

export const setTodos = todos => ({
  type: SET_TODOS,
  payload: todos,
});

export default (todos = [], action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;

    default:
      return todos;
  }
};
