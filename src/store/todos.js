export const addTodo = title => ({
  type: 'ADD_TODO',
  payload: {
    id: +new Date(),
    title,
    completed: false,
  },
});

export default (todos = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...todos,
        action.payload,
      ];

    default:
      return todos;
  }
};
