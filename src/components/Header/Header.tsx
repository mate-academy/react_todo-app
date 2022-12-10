import React from 'react';
import { Todo } from '../../types/Todo';
import { ToggleAllButton } from './ToggleAllButton';
import { NewTodoField } from './NewTodoField';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  todos: Todo[];
  activeTodos: Todo[];
  completedTodos: Todo[];
  isAdding: boolean;
  onErrorMessage: (message: string) => void;
  handleAddTodo: (title: string) => void;
  handleUpdateTodo: (updatedTodo: Todo) => Promise<void>
};

export const Header: React.FC<Props> = React.memo(({
  newTodoField,
  todos,
  activeTodos,
  completedTodos,
  isAdding,
  onErrorMessage,
  handleAddTodo,
  handleUpdateTodo,
}) => {
  return (
    <header className="todoapp__header">
      <ToggleAllButton
        todos={todos}
        activeTodos={activeTodos}
        completedTodos={completedTodos}
        handleUpdateTodo={handleUpdateTodo}
      />

      <NewTodoField
        newTodoField={newTodoField}
        isAdding={isAdding}
        onErrorMessage={onErrorMessage}
        handleAddTodo={handleAddTodo}
      />
    </header>
  );
});
