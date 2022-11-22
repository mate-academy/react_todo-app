import classNames from 'classnames';
import React,
{
  useState,
  useContext,
  MouseEvent,
  KeyboardEvent,
} from 'react';

import { createTodo } from '../../api';
import { Context } from '../context';

export const AddForm: React.FC = () => {
  const [AddTodo, setAddTodo] = useState('');
  const {
    user,
    setTodos,
    todos,
  } = useContext(Context);
  const [addLoader, setAddLoader] = useState(false);

  const randomId = Math.floor(Math.random() * 1000000);

  // eslint-disable-next-line max-len
  const addTodo = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    if (user && AddTodo) {
      e.preventDefault();
      setAddLoader(true);
      createTodo({
        id: randomId,
        title: AddTodo,
        userId: user.id,
        completed: false,
      })
        .then(() => {
          setAddTodo('');
          setAddLoader(false);
          const newTodo = {
            id: randomId,
            title: AddTodo,
            userId: user.id,
            completed: false,
          };

          setTodos([...todos, newTodo]);
        })
        .catch(() => {
          setAddLoader(false);
        });
    }
  };

  return (
    <form style={{ position: 'relative' }}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={AddTodo}
        disabled={addLoader}
        onChange={(e) => {
          setAddTodo(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            addTodo(e);
          }
        }}
      />
      <button
        type="button"
        className="new-todo__button"
        onClick={addTodo}
        disabled={addLoader}
      >
        Add
      </button>
      <div
        data-cy="TodoLoader"
        className={classNames(
          { overlay: addLoader },
        )}
      />
    </form>
  );
};
