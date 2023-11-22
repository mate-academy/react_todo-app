import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodos, useTodosFilter } from '../TodoContext/TodoContext';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useTodos();
  const { filter } = useTodosFilter();
  const getVisibleTodos = (currentTodos: Todo[], currentFilter: Status) => {
    switch (currentFilter) {
      case Status.Active:
        return currentTodos.filter((todo) => !todo.completed);
      case Status.Completed:
        return currentTodos.filter((todo) => todo.completed);
      default:
        return currentTodos;
    }
  };

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setVisibleTodos(getVisibleTodos(todos, filter));
  }, [filter, todos]);

  return (
    <>
      {todos.length > 0 && (
        <ul className="todo-list" data-cy="todosList">
          {visibleTodos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      )}
    </>
  );
};
