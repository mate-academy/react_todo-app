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
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const getTodosHandler = useCallback(() => {
    todosStorage.get().then(setTodos);
  }, []);

  useEffect(() => {
    getTodosHandler();
  }, [getTodosHandler]);

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

    todosStorage
      .post(newTodo)
      .then(() => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setQuery('');
      });
  }, [query]);

  const updateTodoHandler = useCallback(
    (updateTodos: Todo[]): Promise<(Todo | void)[]> => {
      setLoadingIds(updateTodos.map(todo => todo.id));

      const promisingTodos = updateTodos.map(updateTodo => {
        return todosStorage
          .patch(updateTodo)
          .then(savedTodo => {
            setTodos(prevtodos =>
              prevtodos.map(prevTodo => {
                if (prevTodo.id === updateTodo.id) {
                  return updateTodo;
                }

                return prevTodo;
              }),
            );
            inputRef.current?.focus();

            return savedTodo;
          })
          .finally(() => {
            setLoadingIds(prevTodosId =>
              prevTodosId.filter(todoid => todoid !== updateTodo.id),
            );
          });
      });

      return Promise.all(promisingTodos);
    },
    [todos, inputRef],
  );

  const deleteTodo = (todoId: number) => {
    setLoadingIds(prevTodoId => [...prevTodoId, todoId]);
    todosStorage
      .delete(todoId)
      .then(() =>
        setTodos(prevtodos => prevtodos.filter(todo => todo.id !== todoId)),
      )
      .finally(() => {
        inputRef.current?.focus();
        setLoadingIds(prevTodosId =>
          prevTodosId.filter(prevTodoId => prevTodoId !== todoId),
        );
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
          loadingIds={loadingIds}
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
