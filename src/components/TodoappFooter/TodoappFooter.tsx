import React from 'react';
import { ClearCompletedButton } from '../ClearCompletedButton';
import { Filter } from '../Filter';
import { TodosCounter } from '../TodosCounter';
import { useTodos } from '../TodosContext';

interface TodoappFooterProps {
  handleClearCompletedButton: () => void;
}

export const TodoappFooter: React.FC<TodoappFooterProps> = ({
  handleClearCompletedButton,
}) => {
  const { todos } = useTodos();

  const todosLength = todos.filter(
    todo => !todo.completed && todo.isLoaded,
  ).length;

  const todoIsCompleted = todos.some(todo => todo.completed && todo.isLoaded);

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <TodosCounter todosCount={todosLength} />

      <Filter />

      <ClearCompletedButton
        todoCompleted={todoIsCompleted}
        handleClearCompletedButton={handleClearCompletedButton}
      />
    </footer>
  );
};
