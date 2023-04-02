import { useLocation } from 'react-router-dom';
import React, {
  useMemo,
  useCallback,
} from 'react';
import NewTodo from './Components/NewTodo/NewTodo';
import { Todo } from './types/Todo';
import TodoList from './Components/TodoList/TodoList';
import Footer from './Components/Footer/Footer';
import { filterTodos } from './utils/filterTodos';
import { useLocaleStorage } from './hooks/useLocaleStorage';
import { Context } from './context';
import { Links } from './types/Links';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>([], 'todos');
  const { pathname } = useLocation();

  const createNewTodo = useCallback((value: string) => {
    const newTodo = {
      id: +new Date(),
      title: value,
      completed: false,
    };

    setTodos((currTodos: Todo[]) => ([...currTodos, newTodo]));
  }, []);

  const updateTodo = useCallback((todo: Todo) => {
    setTodos((currTodos: Todo[]) => currTodos.map(currTodo => {
      if (currTodo.id === todo.id) {
        return todo;
      }

      return currTodo;
    }));
  }, []);

  const removeTodo = useCallback((id: number) => {
    setTodos((currTodos: Todo[]) => currTodos
      .filter(currTodo => currTodo.id !== id));
  }, []);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, pathname);
  }, [todos, pathname]);

  const activeTodos = useMemo(() => {
    return filterTodos(todos, Links.ACTIVE);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return filterTodos(todos, Links.COMPLETED);
  }, [todos]);

  const isAllCompleted = completedTodos.length === todos.length;

  const changeAllTodo = useCallback(() => {
    setTodos((currTodos: Todo[]) => currTodos.map(currTodo => {
      if (currTodo.completed === !isAllCompleted) {
        return currTodo;
      }

      return { ...currTodo, completed: !isAllCompleted };
    }));
  }, [isAllCompleted]);

  const removeAllCompleted = useCallback(() => {
    setTodos((currTodos: Todo[]) => currTodos.filter(currTodo => {
      return !currTodo.completed;
    }));
  }, []);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo createNewTodo={createNewTodo} />
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isAllCompleted}
              onChange={changeAllTodo}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <Context.Provider value={{ updateTodo, removeTodo }}>
              <TodoList todos={visibleTodos} />
            </Context.Provider>
          </section>

          <Footer
            activeTodos={activeTodos.length}
            completedTodos={completedTodos.length}
            removeAllCompleted={removeAllCompleted}
          />
        </>
      )}
    </div>
  );
};
