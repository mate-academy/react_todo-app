import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';
import { Todo } from '../../types/Todo';

export const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos, addTodo, disabledButton, updateTodos } =
    useContext(TodoContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo = {
      id: maxId || 1,
      title: trimmedQuery,
      completed: false,
    };

    addTodo(newTodo);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleClickAllCompleted = (todosToUpdate: Todo[]) => {
    todosToUpdate.map(todoToUpdate => {
      if ((!disabledButton && !todoToUpdate.completed) || disabledButton) {
        updateTodos({
          ...todoToUpdate,
          completed: disabledButton ? false : true,
        });
      }
    });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: disabledButton,
          })}
          data-cy="ToggleAllButton"
          onClick={() => handleClickAllCompleted(todos)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleChange}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
