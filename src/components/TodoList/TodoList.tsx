import React, { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const { todos, filterValue } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => {
    if (filterValue === Status.Active) {
      return (todo.completed === false);
    }

    if (filterValue === Status.Completed) {
      return (todo.completed === true);
    }

    return true;
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
