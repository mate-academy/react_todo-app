import { useContext } from 'react';

import { TodosContext } from '../../../context/TodoContext';
import { useTodoFormManager } from '../../../hooks/useTodoFormManager';

export const TodoForm = () => {
  const { inputRef } = useContext(TodosContext);
  const { title, handleSubmit, handleChangeTitle, isInputDisabled } =
    useTodoFormManager();

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        ref={inputRef}
        disabled={isInputDisabled}
        onChange={handleChangeTitle}
      />
    </form>
  );
};
