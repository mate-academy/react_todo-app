import React from 'react';
import { Todo } from '../../interfaces/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  items: Todo[];
  toggleAll: () => void;
}

export const TodoList: React.FC<Props> = ({ items, toggleAll }) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      data-cy="toggleAll"
      onChange={toggleAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list" data-cy="todoList">
      {items.map((item) => (
        <TodoItem item={item} key={item.id} />
      ))}
    </ul>
  </section>
);
