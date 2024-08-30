import { useTodosContext } from '../../context/TodosContext';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { addTodo } from '../../helpers/addTodo';
import classNames from 'classnames';
import { toggleAllTodos } from '../../helpers/toggleAllTodos';

export const TodoForm = () => {
  const { todos, setTodos, completedTodos } = useTodosContext();
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const trimmedValue = inputValue.trim();

  const addTodoToList = (e: FormEvent<HTMLFormElement>) => {
    if (trimmedValue) {
      e.preventDefault();

      addTodo({
        setTodos,
        newTodo: {
          id: Date.now(),
          title: trimmedValue,
          completed: false,
        },
      });
      setInputValue('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length === completedTodos.length,
          })}
          data-cy="ToggleAllButton"
          onClick={() => toggleAllTodos({ todos, setTodos })}
        />
      )}

      <form className="todoapp__form" onSubmit={addTodoToList}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={inputValue}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};
