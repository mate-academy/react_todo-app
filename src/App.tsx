/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodo, getTodos, updateTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { Header } from './components/Header';
import { ErrorInfo } from './components/ErrorInfo';
import { Footer } from './components/Footer';

const getFilteredTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  const filteredTodos = [...todos];

  switch (filter) {
    case FilterType.active:
      return filteredTodos.filter(todo => !todo.completed);
    case FilterType.completed:
      return filteredTodos.filter(todo => todo.completed);
    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [isFocusing, setIsFocusing] = useState(true);
  const [filter, setFilter] = useState(FilterType.all);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadTodos, setLoadTodos] = useState<number[]>([]);

  const filteredTodos = getFilteredTodos(todos, filter);

  const getCountActive = (): number => {
    return todos.filter(todo => !todo.completed).length;
  };

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const onSubmit = (value: Todo): void => {
    setTodos(prev => [...prev, value]);
    setTitle('');
  };

  const onDelete = (value: number): void => {
    setTodos(prev => {
      const newList = [...prev].filter(todo => todo.id !== value);

      return newList;
    });
    setIsFocusing(prev => !prev);
  };

  const handleDeleteCompleted = (): void => {
    const completedIds = getFilteredTodos(todos, FilterType.completed).map(
      todo => todo.id,
    );

    setLoadTodos(completedIds);

    const deletedTodos: number[] = [];

    Promise.allSettled(
      completedIds.map(id => deleteTodo(id).then(() => deletedTodos.push(id))),
    ).then(results => {
      const failedDeletions = results.filter(
        result => result.status === 'rejected',
      );

      if (failedDeletions.length > 0) {
        setError('Unable to delete a todo');
      }

      setLoadTodos([]);
      setTodos(prev =>
        [...prev].filter(todo => !deletedTodos.includes(todo.id)),
      );
      setIsFocusing(prev => !prev);
    });
  };

  const handleChangeChecked = (todoId: number, checked: boolean) => {
    const findTodo: Todo = todos.find(todo => todo.id === todoId) as Todo;
    const newTodo: Todo = {
      id: todoId,
      userId: findTodo.userId,
      title: findTodo.title,
      completed: checked,
    };

    setLoadTodos(prev => [...prev, todoId]);

    updateTodo(todoId, newTodo)
      .then(response => {
        setTodos(prevTodos =>
          prevTodos.map(todo => (todo.id === todoId ? response : todo)),
        );
      })
      .catch(() => setError('Unable to update a todo'))
      .finally(() => {
        setLoadTodos(prev => prev.filter(id => id !== todoId));
      });
  };

  const handleToggle = () => {
    const notCompletedIds = getFilteredTodos(todos, FilterType.active).map(
      todo => todo.id,
    );
    const notCompletedTodos = getFilteredTodos(todos, FilterType.active);

    const updater = (
      ids: number[],
      startList: Todo[],
      copmletedVal: boolean,
    ): void => {
      setLoadTodos(notCompletedIds);

      const updatedTodos: Todo[] = [];

      Promise.allSettled(
        ids.map((id, ind) =>
          updateTodo(id, { ...startList[ind], completed: copmletedVal }).then(
            response => {
              updatedTodos.push(response);
            },
          ),
        ),
      ).then(results => {
        const failedDeletions = results.filter(
          result => result.status === 'rejected',
        );

        if (failedDeletions.length > 0) {
          setError('Unable to update a todo');
        }

        setLoadTodos([]);

        setTodos(prev => {
          return prev.map(todo => {
            const updatedTodo = updatedTodos.find(
              updated => updated.id === todo.id,
            );

            return updatedTodo ? updatedTodo : todo;
          });
        });
      });
    };

    if (notCompletedIds.length === 0) {
      const completedIds = getFilteredTodos(todos, FilterType.completed).map(
        todo => todo.id,
      );
      const completedTodos = getFilteredTodos(todos, FilterType.completed);

      updater(completedIds, completedTodos, false);
    } else {
      updater(notCompletedIds, notCompletedTodos, true);
    }
  };

  const isClearButton =
    getFilteredTodos(todos, FilterType.completed).length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          onChange={setTitle}
          onSubmit={onSubmit}
          onError={setError}
          onAdd={setTempTodo}
          loadTodos={loadTodos}
          onLoadTodos={setLoadTodos}
          todos={todos}
          onToggle={handleToggle}
          isFocusing={isFocusing}
          isLoading={isLoading}
        />

        <TodoList
          todos={filteredTodos}
          tempTodo={tempTodo}
          loadTodos={loadTodos}
          onChange={setTodos}
          onLoadTodos={setLoadTodos}
          onDelete={onDelete}
          onError={setError}
          onChangeChecked={handleChangeChecked}
        />

        {todos.length > 0 && (
          <Footer
            selected={filter}
            onSelect={setFilter}
            counter={getCountActive()}
            isClearButton={isClearButton}
            onDelete={handleDeleteCompleted}
          />
        )}
      </div>

      <ErrorInfo error={error} onError={setError} />
    </div>
  );
};
