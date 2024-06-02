import React, { Ref } from 'react';

type Props = {
  activeInput: Ref<HTMLInputElement>;
  createNewTodo: () => void;
  titleNew: string;
  setTitleNew: (title: string) => void;
  loadTodo: boolean;
  allTodosCompleted: boolean;
  makeToggleAll: () => void;
  noTodos: boolean;
};

export const Header: React.FC<Props> = ({
  activeInput,
  createNewTodo,
  titleNew,
  setTitleNew,
  loadTodo,
  allTodosCompleted,
  makeToggleAll,
  noTodos,
}) => {
  const onAddNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    createNewTodo();
  };

  return (
    <header className="todoapp__header">
      {noTodos && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allTodosCompleted && 'active'}`}
          data-cy="ToggleAllButton"
          onClick={makeToggleAll}
        />
      )}
      <form method="POST" onSubmit={onAddNewTodo}>
        <input
          disabled={loadTodo}
          ref={activeInput}
          value={titleNew}
          onChange={event => setTitleNew(event.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
