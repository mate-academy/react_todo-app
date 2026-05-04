import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ClickedToggleAllContext,
  NewTodoContext,
  TodosContext,
} from '../../TodosContext/Context';

export const TodoAppHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const setTodo = useContext(NewTodoContext).setAddTodo;
  const titleField = useRef<HTMLInputElement>(null);
  const todos = useContext(TodosContext).todos;
  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);
  const setClickToggleAll = useContext(
    ClickedToggleAllContext,
  ).setClickToggleAll;

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [todos]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title.trim()) {
        return;
      } else {
        setTodo({
          id: +new Date(),
          title: title.trim(),
          completed: false,
        });
        setTitle('');
      }
    },
    [title],
  );

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && 
      <button
        type="button"
        className={`todoapp__toggle-all ${allTodosCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={() => setClickToggleAll(true)}
      />}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={titleField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
