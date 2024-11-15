import { useMemo, useState } from 'react';
import { FilterStatuses } from '../utils/enums/FilterStatuses';
import { getFiltredTodo } from '../utils/todos/filterTodo';
import { Todo } from '../types/Todo';

export const useTodoFilter = (todos: Todo[]) => {
  const [todoStatus, setTodoStatus] = useState<FilterStatuses>(
    FilterStatuses.All,
  );

  const filtredTodos = useMemo(
    () => getFiltredTodo(todos, todoStatus),
    [todoStatus, todos],
  );

  return { filtredTodos, setTodoStatus, todoStatus };
};
