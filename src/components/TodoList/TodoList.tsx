import React from 'react';
import './TodoList.css';
import { TodoItem } from '../TodoItem';
import { useTodosContext } from '../controllers/todos';
import { handleFilteredTodos } from '../../utils';

interface Props {
  onChangeIsTodosEmpty: (value: boolean) => void;
}

export const TodoList: React.FC<Props> = ({ onChangeIsTodosEmpty }) => {
  const { todos, selectedFilter } = useTodosContext();
  const filteredTodos = handleFilteredTodos(todos, selectedFilter);

  if (!todos.length) {
    onChangeIsTodosEmpty(false);
  } else {
    onChangeIsTodosEmpty(true);
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
