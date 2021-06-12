import React, { useContext, useState } from 'react';
import { DispatchContext } from '../context/TodosContext';
import { actions } from '../context/reducer';
import { USER_ID } from '../constants';
import { addTodo } from '../api';

export function NewTodo() {
  const [todo, setTodo] = useState('');
  const dispatch = useContext(DispatchContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (todo.trim()) {
          addTodo(USER_ID, todo.trim())
            .then((newTodo) => {
              dispatch(actions.addTodo(newTodo.id, newTodo.title));
            })
            .catch(error => alert(error));

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
