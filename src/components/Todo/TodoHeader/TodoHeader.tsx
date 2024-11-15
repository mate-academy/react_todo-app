import { FC } from 'react';
import cn from 'classnames';

import { Todo } from '../../../types/Todo';
import { isAllTodosCompleted } from '../../../utils/todos/getTodos';
import { TodoForm } from '../TodoForm/TodoForm';
import { useTodoFormManager } from '../../../hooks/useTodoFormManager';

interface TodoHeaderProps {
  todos: Todo[];
}

export const TodoHeader: FC<TodoHeaderProps> = ({ todos }) => {
  const { handleToogleAllTodoStatus } = useTodoFormManager();

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isAllTodosCompleted(todos),
          })}
          data-cy="ToggleAllButton"
          onClick={handleToogleAllTodoStatus}
        />
      )}

      <TodoForm />
    </header>
  );
};
