import {
  FC,
  FormEvent,
  ChangeEvent,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

import { DispatchContext, StateContext } from '../../store/store';

export const Header: FC = () => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isAllTodosCompleted = todos.every(todo => todo.completed);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedTitle = title.trim();

    if (formattedTitle.length) {
      const newTodo: Todo = {
        title: formattedTitle,
        id: +new Date(),
        completed: false,
      };

      dispatch({ type: 'addTodo', payload: newTodo });
      setTitle('');
    }
  };

  const handleToggleAllTodos = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllTodosCompleted,
    }));

    dispatch({
      type: 'changeTodos',
      payload: updatedTodos,
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllTodosCompleted })}
          onClick={handleToggleAllTodos}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={title}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
