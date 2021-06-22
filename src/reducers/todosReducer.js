const RESET = 'RESET';
const TOGGLE = 'TOGGLE';
const TOGGLE_ALL = 'TOGGLE_ALL';
const DELETE = 'DELETE';
const DELETE_COMPLETED = 'DELETE_COMPLETED ';
const ADD_TODO = 'ADD_TODO';
const UPDATE_TODO = 'UPDATE_TODO';

export const actions = {
  reset: todos => ({ type: RESET, todos }),
  toggle: id => ({ type: TOGGLE, id }),
  delete: id => ({ type: DELETE, id }),
  toggleAll: () => ({ type: TOGGLE_ALL }),
  deleteCompleted: () => ({ type: DELETE_COMPLETED }),
  addTodo: (id, title) => ({ type: ADD_TODO, id, title }),
  updateTodo: (id, title) => ({ type: UPDATE_TODO, id, title }),
};

export function todosReducer(todos, action) {
  switch (action.type) {
    case RESET:
      return action.todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }));

    case TOGGLE:
      return todos.map((todo) => {
        if (todo.id !== action.id) {
          return todo;
        }

        return {
          id: action.id,
          title: todo.title,
          completed: !todo.completed,
        };
      });

    case DELETE:
      return todos.filter(todo => (
        todo.id !== action.id
      ));

    case TOGGLE_ALL:
      if (todos.every(todo => todo.completed)
        || todos.every(todo => !todo.completed)
      ) {
        return todos.map(({ id, title, completed }) => ({
          id, title, completed: !completed,
        }));
      }

      return todos.map(({ id, title }) => ({
        id, title, completed: true,
      }));

    case ADD_TODO:
      return [
        ...todos,
        { id: action.id, title: action.title, completed: false },
      ];

    case DELETE_COMPLETED:
      return todos.filter(todo => !todo.completed);

    case UPDATE_TODO:
      return todos.map((todo) => {
        if (todo.id !== action.id) {
          return todo;
        }

        return {
          id: action.id,
          title: action.title,
          completed: todo.completed,
        };
      });

    default:
      return todos;
  }
}
