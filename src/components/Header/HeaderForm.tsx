import { FC, useContext, useState } from 'react';
import { TodoContext } from '../../Context/TodoContext';

export const HeaderForm: FC = () => {
  const [text, setNewTodo] = useState('');
  const { inputRef, dispatch } = useContext(TodoContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTodo = text.trim();

    if (trimmedTodo !== '') {
      const newTodo = {
        id: crypto.randomUUID(),
        title: text.trim(),
        completed: false,
      };

      dispatch({ type: 'ADD_TODO', payload: newTodo });
    }

    setNewTodo('');
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
          ref={inputRef}
          value={text}
          onChange={e => setNewTodo(e.target.value)}
        />
      </label>
    </form>
  );
};
