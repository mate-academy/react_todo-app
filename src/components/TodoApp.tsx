import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TaskUrlStatus } from '../types/TaskUrlStatus';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../useLocalStorage';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const location = useLocation();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!title.trim()) {
        return;
      }

      const newTodo: Todo = {
        id: +new Date(),
        title,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
    }, [todos, title],
  );

  const toggleAllHandler = useCallback((): void => {
    const completedTodos = todos.every(todo => todo.completed);

    const allTodos = todos.map(todo => {
      if (completedTodos) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      if (!completedTodos) {
        return {
          ...todo,
          completed: true,
        };
      }

      return todo;
    });

    setTodos([...allTodos]);
  }, [todos]);

  const deleteHandler = useCallback((todoId: number) => {
    const unDeletedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos([...unDeletedTodos]);
  }, [todos]);

  const completeHandler = useCallback((todoId: number) => {
    const completeTodo = todos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos([...completeTodo]);
  }, [todos]);

  const editHandler = useCallback((todoId: number, newTitle: string) => {
    const editedTodos = todos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    });

    setTodos([...editedTodos]);
  }, [todos]);

  const clearCompletedHandler = useCallback(
    (): void => {
      const clereadTodos = todos.filter(todo => !todo.completed);

      setTodos([...clereadTodos]);
    }, [todos],
  );

  const filteredTodos = useMemo(() => todos.filter(todo => {
    switch (location.pathname) {
      case TaskUrlStatus.Active:
        return !todo.completed;

      case TaskUrlStatus.Completed:
        return todo.completed;

      default:
        return TaskUrlStatus.All;
    }
  }), [todos, location]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={() => {}}
              onClick={() => toggleAllHandler()}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={filteredTodos}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
              editHandler={editHandler}
            />
          </section>

          <TodoFilter
            todos={todos}
            clearCompletedHandler={clearCompletedHandler}
          />
        </>
      )}
    </div>
  );
};
