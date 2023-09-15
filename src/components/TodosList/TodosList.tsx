import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  visibleTodos: Todo[],
  tempTodo: Todo | null,
  isUpdating: boolean,
  selectedTodoId: number | null,
  completedTodosId: number[],
  isClearCompletedTodos: boolean,
  isToggleAll: boolean,
};

export const TodosList: React.FC<Props> = React.memo(
  ({
    visibleTodos,
    tempTodo,
    isUpdating,
    selectedTodoId,
    completedTodosId,
    isClearCompletedTodos,
    isToggleAll,
  }) => (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          isUpdating={isUpdating && (
            !todo.id
          || selectedTodoId === todo.id
          || (completedTodosId.some(id => id === todo.id)
              && isClearCompletedTodos)
          )}
          isToggleAll={isToggleAll}
        />
      ))}

      {tempTodo && (
        <TodoItem tempTodo={tempTodo} />
      )}
    </section>
  ),
);
