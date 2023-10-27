import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from '../contexts/TodosContext';
import { Todo } from '../types/Todo';

export const Main: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const isChecked = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    let modifiedTodos: Todo[] = [];
    const areAllSameTodoStatus
      = todos.every(todo => todo.completed)
      || todos.every(todo => !todo.completed);

    if (areAllSameTodoStatus) {
      modifiedTodos = todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }));
    } else {
      modifiedTodos = todos.map(todo => ({
        ...todo,
        completed: true,
      }));
    }

    setTodos(modifiedTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleToggleAll}
        checked={isChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
