import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

enum Status {
  ACTIVE = '/active',
  COMPLETED = '/completed',
}

const useLocaleStorage = () => {
  const todosFromStorage = localStorage.getItem('todos');

  try {
    return todosFromStorage
      ? JSON.parse(todosFromStorage)
      : [];
  } catch (error) {
    return [];
  }
};

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(useLocaleStorage);
  const [value, setValue] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setVisibleTodos(todos);
  }, [todos]);

  useEffect(() => {
    switch (pathname) {
      case Status.ACTIVE:
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;

      case Status.COMPLETED:
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setVisibleTodos(todos);
    }
  }, [pathname, todos]);

  const createNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!value) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: value,
      completed: false,
    };

    setTodos(prevState => [...prevState, newTodo]);
    setValue('');
  };

  const itemsLeft = visibleTodos.filter(items => !items.completed).length;

  const onClearCompletedTodos = () => {
    const activeItems = todos.filter(todo => !todo.completed);

    setTodos(activeItems);
  };

  const toggleAll = () => {
    const allCompletedTodos = todos.every(todo => todo.completed);
    let toggledTodos;

    if (allCompletedTodos) {
      toggledTodos = todos.map(todo => {
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    } else {
      toggledTodos = todos.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      });
    }

    setTodos(toggledTodos);
  };

  const onTodoComplete = (todoId: number): void => {
    const completedTodo = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(completedTodo);
  };

  const onTodoDestroy = (todoId: number): void => {
    const notDestroyedTodo = todos.filter(todo => todo.id !== todoId);

    setTodos(notDestroyedTodo);
  };

  const onTodoEdit = (todoId: number, title: string) => {
    const editedTodo = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    });

    setTodos(editedTodo);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => createNewTodo(event)}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
      </header>

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
          visibleTodos={visibleTodos}
          onTodoComplete={onTodoComplete}
          onTodoDestroy={onTodoDestroy}
          onTodoEdit={onTodoEdit}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${itemsLeft} items left`}
          </span>

          <TodosFilter />

          <button
            type="button"
            className="clear-completed"
            onClick={onClearCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      )}
    </div>
  );
};
