import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DispatchContext, StateContext } from './Store';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { getCompletedTodosArray } from '../utils/todo';

export const TodoHeader = () => {
  const { todos, newTodoTitle } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputRef = useRef<HTMLInputElement>(null);

  // Novo estado para o contador de IDs
  const [idCounter, setIdCounter] = useState<number>(0);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Dependência vazia para execução única após a montagem

  const handleSetNewTodoTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({ type: 'setNewTodoTitle', payload: event.target.value });
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      return;
    }

    // Gerar um novo ID único
    const newTodo: Todo = {
      id: idCounter, // Usando o contador para o ID
      title: newTodoTitle.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    dispatch({ type: 'setNewTodoTitle', payload: '' });
    setIdCounter(prevCounter => prevCounter + 1); // Atualizar o contador de IDs
  };

  const validation = todos.every(todo => todo.completed === true);

  const handleToggleAll = () => {
    dispatch({ type: 'setAllCompleted', payload: !validation });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length === getCompletedTodosArray(todos).length,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleSetNewTodoTitle}
        />
      </form>
    </header>
  );
};
