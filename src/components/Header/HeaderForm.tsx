import { FC, useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../../Context/TodoContext';

export const HeaderForm: FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const textInput = useRef<HTMLInputElement | null>(null);

  const { addTodo } = useContext(TodoContext);

  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTodo = newTodo.trim();

    if (trimmedTodo !== '') {
      addTodo(trimmedTodo);
    }

    setNewTodo('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="NewTodo">
        <input
          id="NewTodo"
          data-cy="NewTodoField"
          type="text"
          title="Write new todo"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={handleChange}
          ref={textInput}
        />
      </label>
    </form>
  );
};
