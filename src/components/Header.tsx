import { useContext, useMemo, useRef } from 'react';
import { ToDo } from '../types/types';
import { ToDoContext } from '../store/AppContext';
import cn from 'classnames';
import { createUniqueId } from '../helpers/createUniqueId';

export const Header: React.FC = () => {
  const dispatch = useContext(ToDoContext).dispatch;
  const state = useContext(ToDoContext).state;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodoField = inputRef.current;

    if (!newTodoField || !newTodoField.value.trim()) {
      return;
    }

    const newTodo: ToDo = {
      id: createUniqueId(),
      title: newTodoField.value,
      completed: false,
      isEditing: false,
    };

    dispatch({ type: 'ADD_TODO', payload: newTodo });
    newTodoField.value = '';
  };

  const allToDosCompleted = useMemo(
    () => state.todoList.every((todo: ToDo) => todo.completed),
    [state.todoList],
  );

  return (
    <header className="todoapp__header">
      <button
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_ALL' })}
        className={cn('todoapp__toggle-all', { active: allToDosCompleted })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleNewTodo}>
        <input
          ref={inputRef}
          name="newTodoField"
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          autoFocus
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
