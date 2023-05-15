import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  items: Todo[],
  handleComplete: (todoId: number, status: boolean) => void,
  handleCompleteAll: () => void,
  hasActiveTodos: boolean,
  handleDelete: (todoId: number) => void,
  handleChangeTitle: (todoId: number, newTitle: string) => void,
}

export const TodoList: React.FC<Props> = React.memo(({
  items,
  handleComplete,
  handleCompleteAll,
  hasActiveTodos,
  handleDelete,
  handleChangeTitle,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleCompleteAll}
        checked={hasActiveTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {items.map(item => (
          <li key={item.id}>
            <TodoItem
              item={item}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              handleChangeTitle={handleChangeTitle}
            />
          </li>
        ))}
      </ul>
    </section>
  );
});
