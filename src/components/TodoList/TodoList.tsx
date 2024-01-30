/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem.jsx/TodoItem';
import { TodosContext } from '../../TodosContext/TodosContext';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case Status.Active:
        return todo.completed === false;
      case Status.Completed:
        return todo.completed === true;
      default:
        return true;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </ul>
  );
};
