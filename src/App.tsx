import React, { useContext, useEffect, useState } from 'react';
import {
  createTodo, deleteTodo, getTodos, toggleTodo,
} from './api/todos';
import { AuthContext } from './components/Auth';
import { Footer } from './components/Footer';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  // const [processingTodoIds, setProcessingTodoIds] = useState<number[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useContext(AuthContext);
  const userId = user ? user?.id : 0;

  const loadTodos = async () => {
    const response = await getTodos(userId);

    setTodos(response);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.All:
        return todo;

      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return null;
    }
  });

  const handleDeleteTodo = async (todoId: number) => {
    await deleteTodo(todoId);

    setTodos(prevTodos => prevTodos.filter(
      todo => todo.id !== todoId,
    ));
  };

  const handleAddTodo = async (title: string) => {
    const response = await createTodo({
      userId,
      title,
      completed: false,
    });

    setTodos(prevTodos => [...prevTodos, response]);
  };

  const handleToggleTodo = async (todo: Todo) => {
    await toggleTodo(todo.id, !todo.completed);

    setTodos(prevTodos => prevTodos.map(prevTodo => {
      if (todo.id === prevTodo.id) {
        return {
          ...prevTodo,
          completed: !prevTodo.completed,
        };
      }

      return prevTodo;
    }));
  };

  const handleToggleAll = async () => {
    await todos.forEach(todo => {
      toggleTodo(todo.id, !todos.every(item => item.completed));
    });

    setTodos(prevTodos => prevTodos.map(prevTodo => {
      return {
        ...prevTodo,
        completed: !todos.every(item => item.completed),
      };
    }));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <NewTodoForm
          onAdd={handleAddTodo}
        />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={todos.every(todo => todo.completed)}
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />

            <Footer
              todos={todos}
              filter={filter}
              onFilterSelect={setFilter}
              onDelete={handleDeleteTodo}
            />
          </>
        )}

      </section>
    </div>
  );
};
