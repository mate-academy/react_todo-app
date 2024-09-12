import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../store/todoReducer';
import { Todo } from '../../types/state';
import { Action } from '../../types/actions';

export const Header = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [todoTitle, setTodoTitle] = useState('');
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [todos]);

  //I want to use useMemo, bit it doesn't work properly
  const isAllTodoComplete = todos.every(todo => todo.completed);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    dispatch({ type: Action.addTodo, payload: newTodo });

    setTodoTitle('');
  };

  const handleStatusChange = () => {
    const isActiveTodo = todos.every(todo => todo.completed);

    todos.forEach(todo =>
      dispatch({
        type: Action.updateTodo,
        payload: { id: todo.id, changes: !isActiveTodo },
      }),
    );
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllTodoComplete && 'active'}`}
          data-cy="ToggleAllButton"
          onClick={handleStatusChange}
        />
      )}

      <form onSubmit={event => handleSubmit(event)}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={todoTitle}
          ref={titleRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
