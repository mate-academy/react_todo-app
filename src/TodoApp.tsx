import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { useLocalStorage } from './utils/useLocalStorage';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const location = useLocation();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      switch (location.pathname.slice(1)) {
        case FilterStatus.Active:
          return !todo.completed;
        case FilterStatus.Completed:
          return todo.completed;
        case FilterStatus.All:
        default:
          return todo;
      }
    });
  }, [todos, location]);

  const handleTodoCreation = (title: string) => {
    const newTodo = {
      id: +(new Date()),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleTodoCompletion = (todoId: number) => {
    const updatedTodoList = todos.map((todo: Todo) => {
      return todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo;
    });

    setTodos(updatedTodoList);
  };

  const handleAllTodoCompletion = () => {
    const areTodosCompleted = todos.every((todo: Todo) => todo.completed);

    const changeAllTodos = todos.map((todo: Todo) => {
      return { ...todo, completed: !areTodosCompleted };
    });

    setTodos(changeAllTodos);
  };

  const handleTodoRemoving = (todoId: number) => {
    const updatedTodoList = todos.filter((todo: Todo) => {
      return todo.id !== todoId;
    });

    setTodos(updatedTodoList);
  };

  const handleAllTodoRemoving = () => {
    const unfinishedTodos = todos.filter((todo: Todo) => !todo.completed);

    setTodos(unfinishedTodos);
  };

  const unfinishedTodos = useMemo(() => {
    return todos.filter((todo : Todo) => !todo.completed);
  }, [todos]);

  const finishedTodos = useMemo(() => {
    return todos.filter((todo: Todo) => todo.completed);
  }, [todos]);

  const handleTodoEditing = (todoId: number, title: string) => {
    const changedTodos = todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return { ...todo, title };
      }

      return todo;
    });

    setTodos(changedTodos);
  };

  return (
    <div className="todoapp">
      <Header
        onTodoCreation={handleTodoCreation}
      />

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={todos.every((todo: Todo) => todo.completed)}
          onChange={handleAllTodoCompletion}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={filteredTodos}
          onTodoCompletion={handleTodoCompletion}
          onTodoRemoving={handleTodoRemoving}
          onTodoEditing={handleTodoEditing}
        />
      </section>

      {todos.length > 0 && (
        <Footer
          finishedTodos={finishedTodos}
          unfinishedTodos={unfinishedTodos}
          onAllTodoRemoving={handleAllTodoRemoving}
        />
      )}
    </div>
  );
};
