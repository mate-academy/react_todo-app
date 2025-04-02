/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { todosStorage } from './storage/todos.storage';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { CompleteStatus } from './types/CompleteStatus.enum';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(CompleteStatus.ALL);

  useEffect(() => {
    todosStorage.init();
    setTodos(todosStorage.get());
  }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTodoHandler = useCallback(() => {
    if (query.trim() === '') {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: query.trim(),
      completed: false,
    };

    todosStorage.post(newTodo);
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setQuery('');
  }, [query]);

  const updateTodoHandler = useCallback(
    (updateTodos: Todo[]) => {
      updateTodos.map(updateTodo => {
        todosStorage.patch(updateTodo);

        setTodos(prevtodos =>
          prevtodos.map(prevTodo => {
            if (prevTodo.id === updateTodo.id) {
              return updateTodo;
            }

            return prevTodo;
          }),
        );

        inputRef.current?.focus();
      });
    },
    [inputRef],
  );

  const deleteTodo = (todosId: number[]) => {
    todosId.map(todoId => {
      todosStorage.delete(todoId);
      setTodos(prevtodos => prevtodos.filter(todo => todo.id !== todoId));
      inputRef.current?.focus();
    });
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case CompleteStatus.ACTIVE:
        return !todo.completed;

      case CompleteStatus.COMPLETED:
        return todo.completed;

      default:
      case CompleteStatus.ALL:
        return true;
    }
  });

  const activeTodos = todos.filter(todo => !todo.completed);
  const complitedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          onInput={setQuery}
          onAdd={addTodoHandler}
          ref={inputRef}
          todos={todos}
          onUpdate={updateTodoHandler}
        />

        <TodoList
          todos={filteredTodos}
          onDelete={deleteTodo}
          onUpdate={updateTodoHandler}
        />

        {todos.length > 0 && (
          <Footer
            filter={filter}
            onFilter={setFilter}
            activeTodosCount={activeTodos.length}
            complitedTodos={complitedTodos}
            onDelete={deleteTodo}
          />
        )}
      </div>
    </div>
  );
};
