import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { useLocalStorage } from '../utils/useLocalStorage';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const location = useLocation();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      switch (location.pathname.slice(1)) {
        case FilterBy.active:
          return !todo.completed;

        case FilterBy.completed:
          return todo.completed;

        case FilterBy.all:
        default:
          return todo;
      }
    });
  }, [todos, location]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      completed: false,
      title,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleCompleted = (todoId: number) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleToggleAllTodos = () => {
    const areAllTodosCompleted = todos.every((todo: Todo) => todo.completed);

    const toggledTodos = todos
      .map((todo: Todo) => ({ ...todo, completed: !areAllTodosCompleted }));

    setTodos(toggledTodos);
  };

  const isToggledAll = useMemo(() => {
    return todos.every((todo: Todo) => todo.completed);
  }, [todos]);

  const handleRemoveTodo = useCallback((todoId: number) => {
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  }, [todos]);

  const handleRemoveAllComplitedTodos = () => {
    const deletedTodos = todos.filter((todo: Todo) => !todo.completed);

    setTodos(deletedTodos);
  };

  const editTodo = (todoId: number, title: string) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title };
    }));
  };

  return (
    <div className="todoapp">
      <Header
        onAddTodo={addTodo}
      />

      <section className="main">
        {!!todos.length && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isToggledAll}
              onChange={handleToggleAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          toggleCompleted={toggleCompleted}
          todos={filteredTodos}
          onRemoveTodo={handleRemoveTodo}
          onRename={editTodo}
        />
      </section>

      {!!todos.length && (
        <Footer
          todos={todos}
          onRemoveAllCompletedTodos={handleRemoveAllComplitedTodos}
        />
      )}
    </div>
  );
};
