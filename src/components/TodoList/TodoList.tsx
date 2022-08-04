import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <li className="view" key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
        <li className="view">
          gfsfdgsg
        </li>
      </ul>
    </div>
  );
};
