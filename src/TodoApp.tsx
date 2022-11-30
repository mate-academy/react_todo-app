import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { FilterMethods } from './types/FilterMethods';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localTodos = localStorage.getItem('todos');

    try {
      return localTodos ? JSON.parse(localTodos) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState('');

  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter(({ completed }) => {
    switch (pathname) {
      case FilterMethods.COMPLETED:
        return completed;

      case FilterMethods.ACTIVE:
        return !completed;

      default:
        return true;
    }
  });

  const addNewTodo = (event: FormEvent) => {
    event.preventDefault();
    const newTitle = title.trim();

    if (!newTitle) {
      return;
    }

    const newId = +new Date();

    const todoToAdd = {
      id: newId,
      title: newTitle,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, todoToAdd]);
    setTitle('');
  };

  const activeTodos = todos.filter((todo) => (
    !todo.completed
  ));

  const completedTodos = todos.filter((todo) => (
    todo.completed
  ));

  const chandeTodoStatus = (id: number, status: boolean) => {
    setTodos(
      todos.map((todo: Todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            completed: status,
          };
        }

        return todo;
      }),
    );
  };

  const togleStatus = (
    id: number,
    status: boolean,
  ) => {
    chandeTodoStatus(id, !status);
  };

  const toggleAllTodos = () => {
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

  const deleteTodo = async (id: number) => {
    setTodos(todos.filter((todo: Todo) => id !== todo.id));
  };

  const removeCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const changeInputText = (id: number, query: string) => {
    setTodos(todos.map(todo => {
      if (id === todo.id) {
        return {
          ...todo,
          title: query,
        };
      }

      return todo;
    }));
  };

  return (
    <>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>

        <form onSubmit={addNewTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={toggleAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={filteredTodos}
            deleteTodo={deleteTodo}
            togleStatus={togleStatus}
            changeInputText={changeInputText}
          />
        </section>

        {todos.length > 0 && (
          <Footer
            todosLeft={activeTodos}
            completedTodos={completedTodos}
            removeCompletedTodos={removeCompletedTodos}
          />
        )}
      </div>
    </>
  );
};
