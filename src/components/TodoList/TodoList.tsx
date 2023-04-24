import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { Todo } from '../../types/Todo';
import { TodoElement } from '../TodoElement';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[];
  filterType: FilterType;
  onDelete: (id: number) => void;
  onUpdateTodo: (id: number, data: Partial<Todo>) => void;
  tempTodo: Todo | null,
  isTodoLoading: (id: number) => boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  filterType,
  onDelete,
  onUpdateTodo,
  tempTodo,
  isTodoLoading,
}) => {
  const getTodos = useCallback((): Todo[] => {
    switch (filterType) {
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);

      case FilterType.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filterType]);

  const visibleTodos = getTodos();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {visibleTodos.map(todo => {
        const { id } = todo;

        return (
          <TodoElement
            key={id}
            todo={todo}
            onDelete={onDelete}
            onUpdateTodo={onUpdateTodo}
            isLoading={isTodoLoading(id)}
          />
        );
      })}

      {tempTodo && (
        <TodoElement
          todo={tempTodo}
          onDelete={() => {}}
          onUpdateTodo={() => {}}
          isLoading
        />
      )}
    </Box>
  );
};
