import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  onRemoveTodo: (todoId: number) => void,
  onUpdateTodo: (todoId: number, newTitle: string) => void,
  onChangeStatusTodo: (todoId: number) => void,
  onToggleAll: () => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onUpdateTodo,
  onChangeStatusTodo,
  onToggleAll,
}) => {
  const isAllCompleted = useMemo(() => {
    return todos.every(todo => todo.completed === true);
  }, [todos]);

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={isAllCompleted}
            onChange={onToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={onUpdateTodo}
            onChangeStatusTodo={onChangeStatusTodo}
          />
        ))}
      </ul>
    </section>
  );
};
