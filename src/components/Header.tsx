import { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import cls from 'classnames';

export const Header: React.FC = () => {
  const { setTodo, toggleAll, todos } = useContext(TodosContext);

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedTitle = e.target.value.replace(
      /[^a-zA-Zа-яА-ЯёЁґҐєЄіІїЇ0-9 ]/g,
      '',
    );

    setNewTodoTitle(cleanedTitle);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodoTitle.trim() === '') {
      return;
    }

    const newTodo = {
      id: +Date.now(),
      title: newTodoTitle.trim(),
      completed: false,
      isEditing: false,
      isLoading: false,
    };

    setTodo(newTodo);
    setNewTodoTitle('');
    inputRef?.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={cls('todoapp__toggle-all', {
            active: todos.length > 0 && todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => toggleAll()}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={inputRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          name="new-todo"
          value={newTodoTitle}
          onChange={handleInputChange}
          autoFocus
        />
      </form>
    </header>
  );
};
