import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { useAppSelector } from '../../app/hooks/useAppSelector';

type Props = {
  visibleTodos: Todo[],
  tempTodo: Todo | null,
  selectedTodoId: number | null,
  completedTodosId: number[],
  isClearCompletedTodos: boolean,
  isToggleAll: boolean,
};

export const TodosList: React.FC<Props> = React.memo(
  ({
    visibleTodos,
    tempTodo,
    selectedTodoId,
    completedTodosId,
    isClearCompletedTodos,
    isToggleAll,
  }) => {
    const { isUpdating } = useAppSelector(state => state.todos);

    return (
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
    );
  },
);
