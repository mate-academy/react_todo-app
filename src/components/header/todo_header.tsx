import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { MethodsContext, TodoContext } from '../../TodoContext';

export const HeaderTodo: React.FC = () => {
  const { todo, setTodos } = useContext(TodoContext);
  const method = useContext(MethodsContext);

  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleAddTodo = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = newTitle.trim();

    if (trimmedTitle) {
      const newTodo = {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      };

      setTodos([...todo, newTodo]);
      setNewTitle('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todo]);

  const activeTodos = todo.filter(todoItem => !todoItem.completed);
  const hasTodos = todo.length > 0;
  const allCompleted = activeTodos.length === 0;

  return (
    <>
      {hasTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={method.toggleAll}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={handleChange}
        />
      </form>
    </>
  );
};
