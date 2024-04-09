import { Action } from '../types/Action';
import { Todo } from '../types/Todo';

export const input = {
  handleKey(
    e: React.KeyboardEvent<HTMLInputElement>,
    todo: Todo,
    dispatch: (action: Action) => void,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
  ) {
    if (e.key === 'Escape') {
      setTitle(todo.title);
      dispatch({
        type: 'selectedTodo',
        payload: null,
      });
    }
  },

  checkInput(value: string) {
    let countSpaces = 0;

    for (const letter of value) {
      if (letter === ' ') {
        countSpaces++;
      }
    }

    if (countSpaces === value.length || value.length === 0) {
      return true;
    }

    return false;
  },

  deleteTodo(id: number, todos: Todo[], dispatch: (action: Action) => void) {
    dispatch({
      type: 'todos',
      payload: [...todos].filter(todo => todo.id !== id),
    });
  },
};
