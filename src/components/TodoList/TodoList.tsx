import React, { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../interfaces/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { StatusEnum } from '../../interfaces/StatusEnum';

type Props = {
  filter: StatusEnum;
};

export const TodoList: React.FC<Props> = ({ filter }) => {
  const todos = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {[...todos.filter(todo => {
        switch (filter) {
          case StatusEnum.Active:
            return !todo.completed;
          case StatusEnum.Completed:
            return todo.completed;
          case StatusEnum.All:
          default:
            return todo;
        }
      })].map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
