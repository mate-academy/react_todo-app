import React, { useCallback, useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';
import { TodoList } from './Todo-List/TodoList';

export const TodoApp: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { setTodos } = useContext(TodosContext);
  const { handleCompleteAll, todos } = useContext(TodosContext);
  const hasCompleted = todos.some(todo => todo.completed);

  const addTodo = useCallback(() => {
    if (todoTitle.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: +new Date(),
          title: todoTitle.trim(),
          completed: false,
        },
      ]);
    }
  }, [setTodos, todoTitle]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      addTodo();
      setTodoTitle('');
    },
    [addTodo],
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value);
    },
    [],
  );

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleInput}
        />
      </form>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={hasCompleted}
          onClick={handleCompleteAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
      </section>
    </header>
  );
};
