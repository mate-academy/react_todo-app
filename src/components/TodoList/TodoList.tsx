import React from 'react';
import { useTodoContext } from '../../store/TodoContext';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
}) => {
  const {
    setSingleStatusForAll,
    uncompletedTodosLength,
    setIsLoading,
  } = useTodoContext();

  const handleSetStatusForAll = async () => {
    setIsLoading(true);
    await setSingleStatusForAll();
    setIsLoading(false);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={!uncompletedTodosLength}
        onChange={handleSetStatusForAll}
        data-cy="toggleAll"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
});
