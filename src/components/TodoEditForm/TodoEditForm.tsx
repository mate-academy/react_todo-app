import React, { useState } from 'react';

interface Props {
  title: string;
  titleFieldForm: React.RefObject<HTMLInputElement>;
  onSubmit: (value: string) => void;
}

export const TodoEditForm: React.FC<Props> = ({
  title,
  titleFieldForm,
  onSubmit,
}) => {
  const [newTitle, setNewTitle] = useState(title);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(newTitle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        ref={titleFieldForm}
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        onBlur={() => onSubmit(newTitle)}
      />
    </form>
  );
};
