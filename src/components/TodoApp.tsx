import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FilterStatus } from '../types/FilterStatus';
import { TodosFilter } from './TodosFilter';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [title, setTitle] = useState('');
  const location = useLocation();

  const addTodo = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (title) {
        const newTodo: Todo = {
          id: +new Date(),
          title,
          completed: false,
        };

        setTodos([...todos, newTodo]);
        setTitle('');
      }
    }, [todos, title],
  );

  const deleteHandler = useCallback((todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }, [todos]);

  const toggleAllHandler = useCallback(() => {
    const areAllTodosCompleted = todos.every(todo => todo.completed);

    const allTodos = todos.map(todo => {
      if (areAllTodosCompleted) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      if (!areAllTodosCompleted) {
        return {
          ...todo,
          completed: true,
        };
      }

      return todo;
    });

    setTodos([...allTodos]);
  }, [todos]);

  const toggleCompleteStatus = useCallback((todoId: number) => {
    setTodos(todos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  }, [todos]);

  const editTitle = useCallback((todoId: number, newTitle: string) => {
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

  const clearCompleted = useCallback(() => {
    setTodos(todos.filter(todo => !todo.completed));
  }, [todos]);

  const filteredTodos = useMemo(() => todos.filter(todo => {
    switch (location.pathname) {
      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      default:
        return FilterStatus.All;
    }
  }), [todos, location]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addTodo}>
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
              onClick={() => toggleAllHandler()}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={filteredTodos}
              deleteHandler={deleteHandler}
              toggleCompleteStatus={toggleCompleteStatus}
              editTitle={editTitle}
            />
          </section>

          <TodosFilter
            todos={todos}
            clearCompleted={clearCompleted}
          />
        </>
      )}
    </div>
  );
};
