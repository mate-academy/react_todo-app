import { Todo } from '../types/Todo';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  id: number;
  data: boolean | string;
  keyValue: string;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const updateTodoValue = ({ id, data, keyValue, setTodos }: Props) => {
  setTodos(prevTodos =>
    prevTodos.map(todo =>
      todo.id === id ? { ...todo, [keyValue]: data } : todo,
    ),
  );
};
