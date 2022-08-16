/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import { Context } from './components/Context';
import { Filters } from './components/Filters';
import { Todo } from './types/Todo';

enum TodoFilters {
  completed = '/completed',
  active = '/active',
  default = '',
}

const useFilters = (filter: TodoFilters | string, todos: Todo[]) => {
  switch (filter) {
    case TodoFilters.completed: {
      return todos.filter(todo => todo.completed === true);
    }

    case TodoFilters.active: {
      return todos.filter(todo => todo.completed !== true);
    }

    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosFromLocalStorage = localStorage.todo;

    try {
      return JSON.parse(todosFromLocalStorage) || [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.todo = JSON.stringify(todos);
  }, [todos]);

  const { pathname } = useLocation();
  const currentFilter = useMemo(() => {
    return Object.values(TodoFilters)
      .find(todofilter => todofilter === pathname) || TodoFilters.default;
  }, [pathname]);

  const preparedTodos = useFilters(
    currentFilter,
    todos,
  );

  const handleSubmit = () => {
    if (todos && newTask !== '') {
      setTodos(currentTodos => {
        return ([
          ...currentTodos, {
            title: newTask,
            completed: false,
            id: new Date().toISOString(),
          },
        ]);
      });
    } else if (!todos && newTask.length) {
      setTodos([
        {
          title: newTask,
          completed: false,
          id: new Date().toISOString(),
        },
      ]);
    }

    setNewTask('');
  };

  const contextValues = {
    todos: preparedTodos,
    setTodos,
    newTask,
    setNewTask,
    handleSubmit,
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <Context.Provider value={contextValues}>
        <TodoList />
        <Filters />
      </Context.Provider>
    </div>
  );
};
