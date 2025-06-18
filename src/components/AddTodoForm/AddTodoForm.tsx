import { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../hooks/useTodos';

export const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo, setFocusAddInput } = useTodoContext();

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

  useEffect(() => {
    if (setFocusAddInput) {
      setFocusAddInput(() => () => {
        inputRef.current?.focus();
      });
    }
  }, [setFocusAddInput]);

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
