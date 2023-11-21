import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from './TodosContext';
import { TodoList } from './TodoList';
import { Todo } from '../types/Todo';

export const TodoContent: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    return null;
  }

  const { todos, setTodos } = context;

  const isCompleted = todos.every(todo => todo.completed);

  const toggleAll = () => {
    setTodos((prevTodos: Todo[]) => prevTodos.map(todo => ({
      ...todo,
      completed: !todo.completed,
    })));
  };

  return (
    <section className="main">
      <input
        data-cy="toggleAll"
        type="checkbox"
        id="toggle-all"
        className={cn(
          'toggle-all',
          { active: isCompleted },
        )}
        onClick={toggleAll}
        checked={isCompleted}
      />

      <label htmlFor="toggle-all">
        Mark all as complete
      </label>

      <TodoList />
    </section>
  );
};
