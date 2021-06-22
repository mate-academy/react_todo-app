import React, { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import { actions } from '../reducers/todosReducer';
import { USER_ID } from '../constants';
import { addTodo } from '../api';

export function NewTodo() {
  const [todo, setTodo] = useState('');
  const { dispatch } = useContext(TodosContext);

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
