import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodos, useTodosFilter } from '../TodoContext/TodoContext';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useTodos();
  const { filter } = useTodosFilter();
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    switch (filter) {
      case Status.Active:
        setVisibleTodos(todos.filter((todo) => !todo.completed));
        break;
      case Status.Completed:
        setVisibleTodos(todos.filter((todo) => todo.completed));
        break;
      default:
        setVisibleTodos(todos);
    }
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
