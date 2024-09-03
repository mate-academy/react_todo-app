import { useEffect, useRef } from 'react';
import { useGlobalDispatch, useGlobalState } from '../Store';
import { Todo } from '../types/Todo';

export const MainInput = () => {
  const { query, editingTodoId, todos } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const mainInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mainInputRef.current && !editingTodoId) {
      mainInputRef.current.focus();
    }
  }, [todos, editingTodoId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = query.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    dispatch({ type: 'setQuery', payload: '' });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setQuery', payload: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={mainInputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={handleQueryChange}
      />
    </form>
  );
};
