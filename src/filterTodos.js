/* eslint-disable no-unreachable */
export const filterTodos = (arr, param) => {
  switch (param) {
    case '/completed':
      return arr.filter(todo => todo.completed);
      break;

    case '/active':
      return arr.filter(todo => !todo.completed);
      break;

    default:
      return arr;
      break;
  }
};
