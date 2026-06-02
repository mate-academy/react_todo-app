import { useState, FormEvent } from 'react';
import { useTodoActions } from '../../hooks/useTodoActions';
import { useInputRef } from '../../hooks/useInputRef';

export const CreateTodoForm = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodoActions();
  const inputRef = useInputRef();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    addTodo(normalizedTitle);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        autoFocus
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};
