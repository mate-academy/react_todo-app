import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../services/TodosContext';
import { TodoList } from './TodoList';
import { Status } from '../types/Status';

type Props = {
  status: Status;
};

export const TodoApp: React.FC<Props> = ({ status }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [query, setQuery] = useState('');
  const newTodoField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const addNewTodo = useCallback((): void => {
    if (!query.trim()) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: query.trim(),
        completed: false,
      },
    ]);

    setQuery('');
  }, [query, todos, setTodos]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();

      addNewTodo();
    },
    [addNewTodo],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQuery(event.target.value);
    },
    [],
  );

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            ref={newTodoField}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={handleInputChange}
            onBlur={addNewTodo}
          />
        </form>
      </header>

      {!!todos.length && <TodoList status={status} />}
    </>
  );
};
