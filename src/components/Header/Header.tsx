import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';
import { TodoTitleField } from '../Todo/TodoTitleField';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  addNewTodo: (title: string) => void;
  isAdding: boolean;
  showError: (message: Errors) => void;
  todos: Todo[];
  changeTodo: (
    todo: Todo,
    title: string,
    completed: boolean,
    all: boolean)
  => Promise<void>;
};

export const Header: React.FC<Props> = ({
  newTodoField,
  addNewTodo,
  isAdding,
  showError,
  todos,
  changeTodo,
}) => {
  const isCompleted = useCallback(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const [title, setTitle] = useState('');

  const toggleAll = async () => {
    try {
      todos.map(async (todo: Todo) => {
        if (isCompleted()) {
          await changeTodo(todo, todo.title, false, false);
        } else {
          await changeTodo(todo, todo.title, true, true);
        }
      });
    } catch (e) {
      showError(Errors.UPDATE);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      showError(Errors.TITLE);
    } else {
      addNewTodo(title);
      newTodoField.current?.blur();
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          data-cy="toggleAll"
          type="button"
          aria-label="Toggle All"
          className={
            classNames('todoapp__toggle-all', { active: isCompleted() })
          }
          onClick={toggleAll}
        />
      )}

      <TodoTitleField
        newTodoField={newTodoField}
        isAdding={isAdding}
        value={title}
        setValue={setTitle}
        handleSubmit={handleSubmit}
        placeholder="What needs to be done?"
        className="todoapp__new-todo"
      />
    </header>
  );
};
