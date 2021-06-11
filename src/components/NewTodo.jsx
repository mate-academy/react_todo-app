import React, { useContext, useState } from 'react';
import { DispatchContext } from '../context/TodosContext';
import { actions } from '../context/reducer';

export function NewTodo() {
  const [todo, setTodo] = useState('');
  const dispatch = useContext(DispatchContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (todo.trim()) {
          dispatch(actions.addTodo(todo.trim()));
          setTodo('');
        }
      }}
    >
      <input
        value={todo}
        onChange={e => setTodo(e.target.value)}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
}
