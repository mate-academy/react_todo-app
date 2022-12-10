import React from 'react';
import { Todo } from '../../types/Todo';
import { TodosFilter } from './TodosFilter';
import { ClearCompletedButton } from './ClearCompletedButton';

type Props = {
  activeTodos: Todo[];
  completedTodos: Todo[];
  handleDeleteTodo: (todoId: number) => Promise<void>;
};

export const Footer: React.FC<Props> = React.memo(({
  activeTodos,
  completedTodos,
  handleDeleteTodo,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <TodosFilter />

      <ClearCompletedButton
        completedTodos={completedTodos}
        handleDeleteTodo={handleDeleteTodo}
      />
    </footer>
  );
});
