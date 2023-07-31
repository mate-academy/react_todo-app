import { useLocation } from 'react-router-dom';

import { TodoItem } from './TodoItem';
import { StyledTodoList } from './styled-components';
import { TodosMap } from '../types/TodosMap';
import { TodoType } from '../types/Todo';

type TodoListProps = {
  todosMap: TodosMap;
};

export const TodoList = ({ todosMap }: TodoListProps) => {
  const { pathname } = useLocation();

  const todos = pathname === '/'
    ? todosMap.all
    : todosMap[pathname.slice(1) as keyof TodosMap];

  return (
    <StyledTodoList data-cy="todosList">
      {todos.map((todo: TodoType) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </StyledTodoList>
  );
};
