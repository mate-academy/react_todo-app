/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Todo } from '../../types/todo';
import { TodoList } from '../TodoList';
import { Header } from '../Header';
import { SortType } from '../../types/sort';
import { Footer } from '../Footer';

function useLocaleStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const save = (saveValue: T) => {
    setValue(saveValue);
    localStorage.setItem(key, JSON.stringify(saveValue));
  };

  return [value, save];
}

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [title, setTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const { status } = useParams();

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      switch (status) {
        case SortType.Completed:
          return todo.completed;

        case SortType.Active:
          return !todo.completed;

        default:
          return todo;
      }
    }));
  }, [todos, status]);

  const getActiveTodosCount = () => {
    return todos.filter(todo => {
      return !todo.completed;
    }).length;
  };

  const markAsCompleted = (todoId: number) => {
    return setTodos(todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    }));
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo: Todo) => todoId !== todo.id));
  };

  const findCompleted = () => todos.some((todo) => todo.completed);

  const clearCompleted = () => {
    return setTodos(todos.filter(todo => !todo.completed));
  };

  const handleToggleAll = () => {
    const someTodoActive = todos.some(todo => !todo.completed);

    if (someTodoActive) {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      }));
    }

    if (!someTodoActive) {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          completed: false,
        };
      }));
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitle('');

      return;
    }

    const newTodo = {
      id: Number(new Date()),
      title,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);

    setTitle('');
  };

  const setNewTitle = (newTitle: string, todoId: number) => {
    if (newTitle.trim() === '') {
      deleteTodo(todoId);

      return;
    }

    setTodos(todos
      .map((todo: Todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: newTitle,
          };
        }

        return todo;
      }));
  };

  return (
    <div className="todoapp">
      <Header
        title={title}
        onAddTodo={onAddTodo}
        handleTitle={handleTitle}
      />

      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          items={visibleTodos}
          deleteTodo={deleteTodo}
          markAsCompleted={markAsCompleted}
          setNewTitle={setNewTitle}
        />
      </section>

      {todos.length > 0 && (
        <Footer
          getActiveTodosCount={getActiveTodosCount}
          findCompleted={findCompleted}
          clearCompleted={clearCompleted}
        />
      )}
    </div>
  );
};
