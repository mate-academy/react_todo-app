/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';

/* COMPONENTS */
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

const useLocalStorage = () => {
  const todosFromLocaleStorage = localStorage.getItem('todos');

  try {
    return todosFromLocaleStorage ? JSON.parse(todosFromLocaleStorage) : [];
  } catch {
    return [];
  }
};

export const TodoApp = () => {
  /* STATE */
  const [todos, setTodos] = useState<Todo[]>(useLocalStorage);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  /* GET PATHNAME */
  const location = useLocation();
  const filteredBy = location.pathname;

  /* VARIABLES */
  const countNoCompletedTodos = todos
    .filter(todo => todo.completed === false)
    .length;

  const isCompleted = todos.filter(todo => todo.completed === true);

  /* HOOKS */
  useEffect(() => (
    localStorage.setItem('todos', JSON.stringify(todos))
  ), [todos]);

  useEffect(() => {
    switch (filteredBy) {
      case '/active':
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      case '/completed':
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setVisibleTodos(todos);
    }
  }, [filteredBy, todos]);

  /* FUNCTIONS */
  const changeCompletedOneTodo = (id: number) => {
    const currentTodos = [
      ...todos,
    ];

    const updatedTodo: Todo[] = currentTodos.map(todo => {
      if (todo.id === id) {
        // eslint-disable-next-line no-param-reassign
        todo.completed = !todo.completed;
      }

      return todo;
    });

    setTodos(updatedTodo);
  };

  const changeCompletedAllTodos = () => {
    const updatedTodos = todos.map(todo => {
      if (todos.some(t => t.completed === false)) {
        return {
          ...todo,
          completed: true,
        };
      }

      return {
        ...todo,
        completed: false,
      };
    });

    setTodos(updatedTodos);
  };

  const addTodo = (title: string) => {
    if (title.trim()) {
      const newTodo: Todo = {
        id: +new Date(),
        title,
        completed: false,
      };

      setTodos((prevTodo) => ([...prevTodo, newTodo]));
    }
  };

  const deleteTodo = (id: number) => {
    const currectTodos = [
      ...todos,
    ];

    const newTodos = currectTodos.filter(currentTodo => currentTodo.id !== id);

    setTodos(newTodos);
  };

  const updateTodo = (todoId: number, title: string) => {
    setTodos(visibleTodos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));
  };

  const clearCompletedTodos = () => {
    const currentTodos: Todo[] = [
      ...todos,
    ];

    const filteredTodos = currentTodos.filter(todo => !todo.completed);

    setTodos(filteredTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoForm addTodo={addTodo} />
      </header>

      <section className="main">
        <input
          onChange={changeCompletedAllTodos}
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          items={visibleTodos}
          changeCompletedOneTodo={changeCompletedOneTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </section>

      <TodosFilter
        countNoCompletedTodos={countNoCompletedTodos}
        clearCompletedTodos={clearCompletedTodos}
        isCompleted={isCompleted}
      />
    </div>
  );
};
