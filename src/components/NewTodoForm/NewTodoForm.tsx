import React, { useEffect, useRef, useState } from 'react';

type Props = {
  isAdding: boolean,
  onAdd: (title: string) => void,
};

export const NewTodoForm: React.FC<Props> = ({
  isAdding,
  onAdd,
}) => {
  const [title, setTitle] = useState<string>('');
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(title.trim());
    setTitle('');
  };

  return (
    <>
      <h1 className="todoapp__title">todos</h1>
      <header className="todoapp__header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            ref={newTodoField}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={isAdding}
          />
        </form>
      </header>
    </>
  );
};
