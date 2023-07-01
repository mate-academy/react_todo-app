import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filteredTodos: Todo[],
  toggleAllTodos: () => void,
  setTodos: (todos: Todo[]) => void,
};

export const TodoList: React.FC<Props> = ({
  filteredTodos, toggleAllTodos, setTodos,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={toggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todos={filteredTodos}
            todo={todo}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </section>
  );
};
