import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TodosFilter } from './TodosFilter';
import { TodosContext } from '../services/TodosContext';
import { TodoList } from './TodosList';
import { Status } from '../types/Status';

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.all);
  const newTodoRield = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (newTodoRield.current) {
      newTodoRield.current.focus();
    }
  }, []);

  const selectStatus = useCallback((newStatus: Status) => {
    setStatus(newStatus);
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setQuery(event.target.value);
  };

  const addNewTodo = useCallback((): void => {
    if (!query.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: query.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  }, [query, todos, setTodos]);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      addNewTodo();
    },
    [addNewTodo],
  );

  const isAllTodosCompleted = useMemo(
    () => todos.every(todoItem => todoItem.completed),
    [todos],
  );

  const toggleAllTodos = useCallback(
    (completedStatus: boolean): void => {
      setTodos(todos.map(todo => ({ ...todo, completed: completedStatus })));
    },
    [todos, setTodos],
  );

  const handleToggleChange = useCallback(() => {
    if (isAllTodosCompleted) {
      toggleAllTodos(false);
    } else {
      toggleAllTodos(true);
    }
  }, [isAllTodosCompleted, toggleAllTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="todoapp__toggle-all"
                data-cy="toggleAll"
                checked={isAllTodosCompleted}
                onChange={handleToggleChange}
              />
            </>
          )}
          <form onSubmit={onSubmit}>
            <input
              ref={newTodoRield}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={handleInputChange}
              onBlur={addNewTodo}
            />
          </form>
        </header>

        {!!todos.length && (
          <>
            <TodoList status={status} />
            <TodosFilter status={status} selectStatus={selectStatus} />
          </>
        )}
      </div>
    </div>
  );
};
