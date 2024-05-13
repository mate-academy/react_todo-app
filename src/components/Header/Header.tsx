import { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../../store/store';

import cn from 'classnames';
import { Todo } from '../../Types/Todo';
import useFocusInput from '../../hooks/useFocusInput';
import useLocalStorage from '../../hooks/useLocalStore';

const Header = () => {
  const [title, setTitle] = useState('');
  const { isFocus, todos, selectedTodo } = useContext(StateContext);

  const [localTodo, setLocalTodo] = useLocalStorage<Todo[]>('todos', []);

  const dispatch = useContext(DispatchContext);

  const allCompleted = todos.every(todo => todo.completed);

  const inputRef = useFocusInput();

  useEffect(() => {
    if (isFocus || !selectedTodo) {
      inputRef.current?.focus();
    }
  }, [inputRef, isFocus, selectedTodo]);

  useEffect(() => {
    if (localTodo) {
      dispatch({ type: 'load-todos', payload: localTodo });
    }
  }, [dispatch]);

  useEffect(() => {
    setLocalTodo(todos);
  }, [setLocalTodo, todos]);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      title: title.trim(),
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: 'add-todo', payload: newTodo });

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allCompleted === true,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggle-all' })}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          value={title}
          onChange={e => setTitle(e.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export default Header;
