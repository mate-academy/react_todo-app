import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { Todo } from '../types/Todo';

const Form: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { renamingTodo } = React.useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && !renamingTodo) {
      titleField.current.focus();
    }
  }, [renamingTodo]);

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      title: todoTitle,
      completed: false,
    };

    if (dispatch) {
      dispatch({ type: 'addTodo', payload: newTodo });
    }
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoTitle.trim() === '') {
      return;
    }

    addTodo();
    setTodoTitle('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        ref={titleField}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={handleTitleInput}
      />
    </form>
  );
};

export default Form;
