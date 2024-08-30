import { Todo } from '../types/Todo';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  newTodo: Todo;
}

export const addTodo = ({ setTodos, newTodo }: Props) => {
  setTodos(prevTodos => [...prevTodos, newTodo]);
};
