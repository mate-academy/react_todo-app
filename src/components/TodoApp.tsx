import React from 'react';
import classNames from 'classnames';

type Props = {
  query: string,
  isTodoLoaded: boolean,
  handleTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  addTodo: (event: React.FormEvent, title: string) => Promise<void>,
};

export const TodoApp: React.FC<Props> = ({
  query,
  isTodoLoaded,
  handleTodoInput,
  addTodo,
}) => {
  return (
    <form onSubmit={(event) => addTodo(event, query)}>
      <input
        type="text"
        className={classNames(
          'todoapp__new-todo',
          { 'todoapp__new-todo__load': isTodoLoaded },
        )}
        placeholder="What needs to be done?"
        onChange={handleTodoInput}
        value={query}
      />
    </form>
  );
};
