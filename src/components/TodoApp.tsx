import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { pathname } = useLocation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodoTitle) {
      const newTodo = {
        id: +new Date(),
        title: newTodoTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (pathname) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return Filter.All;
    }
  });

  const tickAllTodos = () => {
    const completedTodos = todos.every(todo => todo.completed);

    const checkAndTick = todos.map(todo => {
      if (completedTodos) {
        return {
          ...todo,
          completed: false,
        };
      }

      return {
        ...todo,
        completed: true,
      };
    });

    setTodos([...checkAndTick]);
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
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={tickAllTodos}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          setTodos={setTodos}
          todos={filteredTodos}
        />
      </section>
      {todos.length > 0 && (
        <TodosFilter
          todos={todos}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};
