/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
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
  const [query, setQuery] = useState('');
  const [isClearBtn, SetClearBtn] = useState(false);

  /* GET PATHNAME */
  const location = useLocation();
  const filteredBy = location.pathname;

  const countNoCompletedTodos = visibleTodos
    .filter(visibleTodo => visibleTodo.completed === false)
    .length;

  /* HOOKS */
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
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value) {
      setQuery(value);
    }
  };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query === '') {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: query,
      completed: false,
    };

    const sameTodo = visibleTodos
      .find(visibleTodo => visibleTodo.title === newTodo.title);

    if (sameTodo) {
      return;
    }

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setQuery('');
  };

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

    SetClearBtn(true);
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
    SetClearBtn(false);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmitForm}>
          <input
            onChange={handleInputChange}
            value={query}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
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
        isClearBtn={isClearBtn}
      />
    </div>
  );
};
