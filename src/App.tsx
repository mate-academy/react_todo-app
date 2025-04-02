/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as todosService from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { Error } from './components/Error/Error';
import { ErrorEnum } from './types/ErrorEnum';
import { CompleteStatus } from './types/CompleteStatus.enum';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorEnum | null>(null);
  const [filter, setFilter] = useState(CompleteStatus.ALL);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const getTodosHandler = useCallback(() => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorEnum.LOAD));
  }, []);

  useEffect(() => {
    getTodosHandler();
  }, [getTodosHandler]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTodoHandler = useCallback(() => {
    if (query.trim() === '') {
      setErrorMessage(ErrorEnum.TITLE);

      return;
    }

    const newTodo = {
      userId: todosService.USER_ID,
      title: query.trim(),
      completed: false,
    };

    setTempTodo({ id: 0, ...newTodo });

    todosService
      .addTodo(newTodo)
      .then(todo => {
        setTodos(prevTodos => [...prevTodos, todo]);
        setQuery('');
      })
      .catch(() => setErrorMessage(ErrorEnum.ADD))
      .finally(() => {
        setTempTodo(null);
      });
  }, [query]);

  const updateTodoHandler = useCallback(
    (updateTodos: Todo[]): Promise<(Todo | void)[]> => {
      setLoadingIds(updateTodos.map(todo => todo.id));

      const promisingTodos = updateTodos.map(updateTodo => {
        const oldTodo = todos.find(todo => todo.id === updateTodo.id);

        return todosService
          .updateTodo(updateTodo)
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
          .catch(() => {
            setTodos(prevtodos =>
              prevtodos.map(todo => {
                if (todo.id === oldTodo?.id) {
                  return oldTodo;
                }

                return todo;
              }),
            );
            setErrorMessage(ErrorEnum.UPDATE);
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
    todosService
      .deleteTodo(todoId)
      .then(() =>
        setTodos(prevtodos => prevtodos.filter(todo => todo.id !== todoId)),
      )
      .catch(() => {
        setTodos(prevTodos => prevTodos);
        setErrorMessage(ErrorEnum.DELETE);
      })
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
          isLoading={tempTodo !== null}
          todos={todos}
          onUpdate={updateTodoHandler}
        />

        <TodoList
          todos={filteredTodos}
          onDelete={deleteTodo}
          tempTodo={tempTodo}
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

      <Error
        errorMessage={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};
