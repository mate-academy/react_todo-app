import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/main';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const items = localStorage.getItem('todos');

    if (!items) {
      return;
    }

    setTodos(JSON.parse(items));
  }, []);

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed === true);
  }, [todos]);

  const removeTodo = useCallback((id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    localStorage.setItem('todos', JSON.stringify(filteredTodos));
    setTodos(filteredTodos);
  }, [todos]);

  const toggleTodo = useCallback((id: number) => {
    const toggledTodos = todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }

      return ({
        ...todo,
        completed: !todo.completed,
      });
    });

    localStorage.setItem('todos', JSON.stringify(toggledTodos));
    setTodos(toggledTodos);
  }, [todos]);

  const toggleAll = useCallback(() => {
    let toggledTodos = todos;

    if (completedTodos.length !== todos.length) {
      toggledTodos = todos.map(todo => {
        return { ...todo, completed: true };
      });
    } else {
      toggledTodos = todos.map(todo => {
        return { ...todo, completed: false };
      });
    }

    localStorage.setItem('todos', JSON.stringify(toggledTodos));
    setTodos(toggledTodos);
  }, [todos]);

  const updateTodo = useCallback((newTitle: string, id: number) => {
    const updatedTodo = todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }

      return { ...todo, title: newTitle };
    });

    localStorage.setItem('todos', JSON.stringify(updatedTodo));
    setTodos(updatedTodo);
  }, [todos]);

  return (
    <div className="todoapp">
      <Header todos={todos} setTodos={setTodos} />

      {!!todos.length
        && (
          <>
            <Main
              todos={todos}
              removeTodo={removeTodo}
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              toggleTodo={toggleTodo}
              toggleAll={toggleAll}
              updateTodo={updateTodo}
            />

            <Footer
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              setTodos={setTodos}
            />
          </>
        )}
    </div>
  );
};
