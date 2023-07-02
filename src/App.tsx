/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useMemo,
  FormEvent,
} from 'react';
import { useParams } from 'react-router-dom';
import { Filter, StorageKey } from './utils/enums';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(StorageKey.todos, []);
  const { filter = '' } = useParams();
  const [query, setQuery] = useState('');
  const [isToggleActive, setIsToggleActive] = useState(true);

  function filterTodos() {
    switch (filter) {
      case Filter.Completed:
        return todos.filter((todo: Todo) => todo.completed);

      case Filter.Active:
        return todos.filter((todo: Todo) => !todo.completed);

      default:
        return todos;
    }
  }

  const visibleTodos = useMemo(filterTodos, [todos, filter]);
  const activeTodos = todos?.filter((todo: Todo) => !todo.completed);
  const isCompletedTodos = todos.some((todo: Todo) => todo.completed);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    const id = +new Date();

    const newTodo = {
      id,
      title: query,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setQuery('');
  };

  const handleTogleAll = () => {
    setTodos(todos.map(
      (todo: Todo) => ({ ...todo, completed: isToggleActive }),
    ));
    setIsToggleActive(currValue => !currValue);
  };

  const handleToggleTodo = (todoId: number, completed: boolean) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        completed,
      };
    }));
  };

  const handleRemoveTodo = (todoId: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== todoId));
  };

  const handleRemoveAll = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  };

  const handleTitleChange = (value: string, todoId: number) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        title: value,
      };
    }));
  };

  return (
    <div className="todoapp">
      <Header
        query={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        activeTodos={activeTodos}
        onToggle={handleTogleAll}
      />

      <TodoList
        todos={visibleTodos}
        onClose={handleRemoveTodo}
        onToggle={handleToggleTodo}
        onChange={handleTitleChange}
      />

      <Footer
        numberOfTodos={activeTodos?.length}
        isCompletedTodos={isCompletedTodos}
        onRemove={handleRemoveAll}
      />
    </div>
  );
};
