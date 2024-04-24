/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState } from 'react';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';

enum FilerType {
  FILTER_TODO_ALL = 'all',
  FILTER_TODO_ACTIVE = 'active',
  FILTER_TODO_COMPLETED = 'completed',
}

function getPrepareTodos(filterField: FilerType, todos: Todo[]) {
  const prepearedTodos = [...todos];

  if (filterField) {
    const result = prepearedTodos.filter(todo => {
      switch (filterField) {
        case FilerType.FILTER_TODO_ALL:
          return todo;
        case FilerType.FILTER_TODO_ACTIVE:
          return todo.completed === true;
        case FilerType.FILTER_TODO_COMPLETED:
          return todo.completed !== true;
        default:
          return todo;
      }
    });

    return result;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [filterField, setFilterField] = useState(FilerType.FILTER_TODO_ALL);

  // const [deleteTodo, setDeleteTodo] = useLocalStorage('todos', null);

  const addTodo = useCallback(
    (newTodo: Todo) => {
      setTodos([...todos, newTodo]);
    },
    [setTodos, todos],
  );

  const updateTodo = useCallback(
    (newTodo: Todo) => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(todo => todo.id === newTodo.id);

      newTodos.splice(index, 1, newTodo);

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  const deleteTodo = useCallback(
    (deletedTodo: Todo) => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(todo => todo.id === deletedTodo.id);

      localStorage.removeItem(deletedTodo.title);

      newTodos.splice(index, 1);

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  const clearCompleted = useCallback(() => {
    const newTodos = [...todos];

    todos.map(togo => localStorage.removeItem(togo.title));

    const deleteTodos = newTodos.filter(todo => todo.completed !== true);

    setTodos(deleteTodos);
  }, [setTodos, todos]);

  const toggleAll = useCallback(() => {
    const newTodos = [...todos];

    const result = newTodos.every(todo => {
      if (todo.completed === true) {
        return true;
      } else {
        return false;
      }
    });

    if (result) {
      const changeTodos = newTodos.map(todo => {
        return { ...todo, completed: !todo.completed };
      });

      setTodos(changeTodos);
    } else {
      const changeTodos = newTodos.map(todo => {
        if (todo.completed === false) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });

      setTodos(changeTodos);
    }
  }, [setTodos, todos]);

  const isEmpty = todos.length <= 0;

  const visibleTodos = getPrepareTodos(filterField, todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isEmpty={isEmpty} onAdd={addTodo} toggleAll={toggleAll} />

        {!isEmpty && (
          <Main
            todos={visibleTodos}
            onUpdate={updateTodo}
            deleteTodo={deleteTodo}
          />
        )}
        {!isEmpty && (
          <Footer
            todos={todos}
            filterField={filterField}
            setFilterField={setFilterField}
            clearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
};
