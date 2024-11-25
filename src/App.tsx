/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';
import { TodoItem } from './components/TodoItem';
import { focusInput } from './utils/services';
import { ErrNotification } from './components/ErrNotification';
import { useTodoContext } from './components/TodoContext';
import { USER_ID } from './utils/constants';

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    isLoading,
    setIsLoading,
    activeTodoId,
    isSubmitting,
    tempTodo,
    inputRef,
    filter,
    showError,
  } = useTodoContext();

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const fetchedTodos = await getTodos(USER_ID);

        setTodos(fetchedTodos);
      } catch {
        showError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    focusInput(inputRef);
  }, [isSubmitting, activeTodoId, inputRef]);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {!isLoading && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />
              ))}
              {tempTodo && <TodoItem todo={tempTodo} key={tempTodo.id} />}
            </section>
            {todos.length > 0 && <Footer />}
          </>
        )}
      </div>
      <ErrNotification />
    </div>
  );
};
