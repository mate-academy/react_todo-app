import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = { filterTodos: Todo[] };

export const TodoList: React.FC<Props> = ({ filterTodos }) => {
  const {
    todos,
    checkedAll,
  } = useContext(TodoContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={checkedAll}
        checked={todos.every((todo) => todo.completed)}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {
          filterTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              toDo={todo}
            />
          ))
        }
      </ul>
    </section>
  );
};
