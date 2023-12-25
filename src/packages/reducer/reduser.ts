import { Actions } from '../../libs/enums';
import { Action, Todo } from '../../libs/types';

export function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case Actions.create: {
      const { todo } = action.payload;

      return [...todos, todo];
    }

    case Actions.remove: {
      const { todoId } = action.payload;

      return todos.filter(({ id }) => id !== todoId);
    }

    case Actions.edit: {
      const { todo } = action.payload;

      return todos.map(existingTodo => {
        if (existingTodo.id === todo.id) {
          return todo;
        }

        return existingTodo;
      });
    }

    case Actions.toggleAll: {
      const { isCompleted } = action.payload;

      return todos.map(todo => (
        { ...todo, completed: isCompleted }
      ));
    }

    case Actions.clearComleted:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
}
