import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
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

  // console.log(todos, setFilter, filteredTodos);

  return (
    <div className="todoapp">
      <header className="header">
        <NewTodoForm />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={filteredTodos}
        />
      </section>

      <Footer
        todos={todos}
        filter={filter}
        onFilterSelect={setFilter}
      />
    </div>
  );
};
