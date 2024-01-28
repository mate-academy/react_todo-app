import React, { useContext, useState } from 'react';
import { TodoUpdateContext } from '../TodosProvider/TodosProvider';

export const AddTodoForm: React.FC = () => {
  const [qerry, setQerry] = useState('');
  const { addTodo } = useContext(TodoUpdateContext);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>):void {
    e.preventDefault();
    setQerry('');

    if (qerry.trim()) {
      addTodo(qerry);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={qerry}
        onChange={(e) => setQerry(e.target.value)}
      />
    </form>
  );
};
