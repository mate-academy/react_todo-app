import React, { FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';

const useLocalStorage = () => {
  const todosFromLocal = localStorage.getItem('todos');

  try {
    return todosFromLocal ? JSON.parse(todosFromLocal) : [];
  } catch (error) {
    return [];
  }
};

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(useLocalStorage);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setVisibleTodos(todos);
  }, [todos]);

  useEffect(() => {
    switch (pathname) {
      case '/active':
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      case '/completed':
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setVisibleTodos(todos);
    }
  }, [pathname, todos]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }

    const todoId = todos.length
      ? todos[todos.length - 1].id + 1
      : 1;

    const newTodo: Todo = {
      id: todoId,
      title: query,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  };

  const toggleCompleted = (todoId: number): void => {
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
    const everyCompleted = todos.every(todo => todo.completed);
    let allTodos;

    if (everyCompleted) {
      allTodos = todos.map(todo => {
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    } else {
      allTodos = todos.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      });
    }

    setTodos(allTodos);
  };

  const onDeleteTodo = (selectedTodo: Todo) => {
    const todosWithoutDeleted = todos
      .filter(todo => todo.id !== selectedTodo.id);

    setTodos(todosWithoutDeleted);
  };

  const updateTodo = (todoId: number, title: string) => {
    setTodos(visibleTodos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos.</h1>
      </header>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </form>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todos={visibleTodos}
          toggleComplete={toggleCompleted}
          onDeleteTodo={onDeleteTodo}
          updateTodo={updateTodo}
        />
      </section>

      {todos.length > 0 && <Footer todos={visibleTodos} setTodos={setTodos} />}
    </div>
  );
};
