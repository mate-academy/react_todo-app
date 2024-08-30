import { Todo } from '../types/Todo';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const toggleAllTodos = ({ todos, setTodos }: Props) => {
  const notCompletedTodos = todos.some((todo: Todo) => !todo.completed);

  setTodos(prevTodos =>
    prevTodos.map(todo => ({
      ...todo,
      completed: notCompletedTodos,
    })),
  );
};
