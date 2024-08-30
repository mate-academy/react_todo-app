import { Todo } from '../types/Todo';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  id: number;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const deleteTodo = ({ id, setTodos }: Props): void => {
  setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
};
