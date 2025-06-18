import { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../context/useTodosContext';

export const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo, focusTrigger } = useTodoContext();

  useEffect(() => {
    inputRef.current?.focus();
  }, [focusTrigger]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    addTodo(newTodo);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
        autoFocus
      />
    </form>
  );
};
