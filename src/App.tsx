import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { useLocalStorage } from './helpers';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const { filter } = useParams();

  const activeTodos: Todo[] = useMemo(() => {
    return todos.filter((todo: Todo) => !todo.completed);
  }, [todos]);

  const completedTodos: Todo[] = useMemo(() => {
    return todos.filter((todo: Todo) => todo.completed);
  }, [todos]);

  const removeTodo = useCallback((id: number) => {
    const filteredTodos = todos.filter((todo: Todo) => todo.id !== id);

    setTodos(filteredTodos);
  }, [todos]);

  const toggleTodo = useCallback((id: number) => {
    const toggledTodos = todos.map((todo: Todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return ({
        ...todo,
        completed: !todo.completed,
      });
    });

    setTodos(toggledTodos);
  }, [todos]);

  const toggleAll = useCallback(() => {
    const completed = completedTodos.length !== todos.length;

    const toggledTodos = todos.map((todo: Todo) => {
      return { ...todo, completed };
    });

    setTodos(toggledTodos);
  }, [todos]);

  const updateTodo = useCallback((newTitle: string, id: number) => {
    const updatedTodo = todos.map((todo: Todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return { ...todo, title: newTitle };
    });

    setTodos(updatedTodo);
  }, [todos]);

  const filteredTodos: Todo[] = useMemo(() => {
    switch (filter) {
      case FilterType.ACTIVE:

        return activeTodos;
      case FilterType.COMPLETED:

        return completedTodos;
      default:

        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="todoapp">
      <Header todos={todos} setTodos={setTodos} />

      {!!todos.length
        && (
          <>
            <TodoList
              todos={filteredTodos}
              removeTodo={removeTodo}
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
