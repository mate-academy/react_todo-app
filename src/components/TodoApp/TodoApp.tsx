import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';

enum Status {
  ALL,
  Active = '/active',
  Completed = '/completed',
}

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosLocal = localStorage.getItem('todos');

    try {
      return todosLocal ? JSON.parse(todosLocal) : [];
    } catch (error) {
      return [];
    }
  });
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const location = useLocation();
  const filteredBy = location.pathname;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    switch (filteredBy) {
      case Status.Active:
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      case Status.Completed:
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setVisibleTodos(todos);
        break;
    }
  }, [todos, filteredBy]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    const uniqId = +new Date();

    const createdTodo = {
      id: uniqId,
      title: query.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, createdTodo]);
    setQuery('');
  };

  const onDeleteTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const onClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const onChangeComplited = (todoId: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const toggleAll = () => {
    const updatedTodos = todos.map(updatedTodo => {
      if (todos.some(todo => !todo.completed)) {
        return {
          ...updatedTodo,
          completed: true,
        };
      }

      return {
        ...updatedTodo,
        completed: false,
      };
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      {todos.length > 0 && (
        <>
          <section className="main">
            <TodoList
              todos={visibleTodos}
              onDeleteTodo={onDeleteTodo}
              onChangeComplited={onChangeComplited}
              toggleAll={toggleAll}
            />
          </section>

          <Footer
            todos={todos}
            onClearCompleted={onClearCompleted}
          />
        </>
      )}
    </div>
  );
};
