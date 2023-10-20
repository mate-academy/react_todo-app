import React, { useCallback, useContext, useState } from 'react';
import { DispatchContext } from '../states/TodosContext';
import { ActionType } from '../types/Action';

export const TodoHeader: React.FC = React.memo(() => {
  const dispatch = useContext(DispatchContext);
  const [todoContent, setTodoContent] = useState('');

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (todoContent !== '') {
      dispatch({
        type: ActionType.Add,
        payload: {
          todo: {
            id: +new Date(),
            title: todoContent,
            completed: false,
          },
        },
      });
    }

    setTodoContent('');
  }, [dispatch, todoContent]);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit} onBlur={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoContent}
          onChange={(event) => setTodoContent(event.target.value)}
        />
      </form>
    </header>
  );
});
