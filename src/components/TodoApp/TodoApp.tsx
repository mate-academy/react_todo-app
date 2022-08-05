import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosLocal = localStorage.getItem('todos');

    try {
      return todosLocal ? JSON.parse(todosLocal) : [];
    } catch (error) {
      return [];
    }
  });
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query) {
      return;
    }

    const uniqId = +new Date();

    const createdTodo = {
      id: uniqId,
      title: query,
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

  const todosLength = todos.filter(todo => !todo.completed).length;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </form>

      {todosLength > 0 && (
        <>
          <section className="main">
            <TodoList
              todos={todos}
              onDeleteTodo={onDeleteTodo}
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
