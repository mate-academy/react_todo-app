import classNames from 'classnames';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { TodoContext } from '../store/TodoContext';
import { addTodoAction, completeAllAction } from '../store/TodoReducer';

export const Header = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const todosAreDone = todos.length > 0 && todos.every(t => t.completed);

  const addTodo = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim().length > 0) {
      dispatch(addTodoAction(newTodo));
      setNewTodo('');
    }
  };

  const completeAll = () => {
    const newValue = !todosAreDone;

    dispatch(completeAllAction(newValue));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todosAreDone,
          })}
          data-cy="ToggleAllButton"
          onClick={completeAll}
        />
      )}
      <form onSubmit={addTodo}>
        <input
          ref={inputRef}
          value={newTodo}
          onChange={event => setNewTodo(event.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
