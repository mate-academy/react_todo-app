import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Todo } from '../../types/Todo';
import { TodoElement } from '../TodoElement';

type Props = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdateTodo: (id: number, data: Partial<Todo>) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onUpdateTodo,
}) => {
  const getTodos = useCallback((filterType: string): Todo[] => {
    switch (filterType) {
      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos]);

  const { pathname } = useLocation();

  const visibleTodos = getTodos(pathname.slice(1));

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
          />
        );
      })}
    </Box>
  );
};
