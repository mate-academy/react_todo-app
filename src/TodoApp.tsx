import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { TodoList } from './components/TodoList/TodoList';
import { TodosContext } from './contexts/TodosContext';
import { getRandomId } from './services/todo';
import { TodoFooter } from './components/TodoFooter/TodoFooter';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const isAllChecked = todos.filter(todo => todo.completed).length
    === todos.length;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoTitle.trim()) {
      const newTodo = {
        id: getRandomId(),
        title: todoTitle.trim(),
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTodoTitle('');
    }
  };

  const handleCheckAll = () => {
    if (isAllChecked) {
      setTodos(todos.map(todo => {
        return { ...todo, completed: false };
      }));
    } else {
      setTodos(todos.map(todo => {
        return { ...todo, completed: true };
      }));
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={isAllChecked}
          onChange={handleCheckAll}
        />
        <label
          htmlFor="toggle-all"
          className={cn(
            { hidden: todos.length === 0 },
          )}
        >
          Mark all as complete
        </label>

        <TodoList />
        {todos.length > 0 && (
          <TodoFooter />
        )}
      </section>
    </div>
  );
};
