import { Todo } from '../types/Todo';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const getTodos = ({ setTodos }: Props) => {
  const data = window.localStorage.getItem('todos');

  if (data) {
    return setTodos(JSON.parse(data));
  }

  return;
};
