import { Action } from '../store/Store';
import { Todo } from '../types/Todo';

export const input = {
  handleKey(
    e: React.KeyboardEvent<HTMLInputElement>,
    todo: Todo,
    changeTitle: (todoItem: Todo) => void,
    setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
  ) {
    if (e.key === 'Enter') {
      changeTitle(todo);
      setSelectedTodo(null);
    }

    if (e.key === 'Escape') {
      setSelectedTodo(null);
      setTitle(todo.title);
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
