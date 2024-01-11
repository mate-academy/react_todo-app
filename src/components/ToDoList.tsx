import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { ToDoItem } from './ToDoItem';
import { TodosContext } from '../context/ToDoContext';
import { Status } from '../types/Status';

type Props = {
};

export const ToDoList: React.FC<Props> = () => {
  const { todos, status } = useContext(TodosContext);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    switch (status) {
      case Status.All:
        return setFilteredTodos(todos);
      case Status.Active:
        return setFilteredTodos(todos.filter(todo => !todo.completed));
      case Status.Completed:
        return setFilteredTodos(todos.filter(todo => todo.completed));
      default:
        return setFilteredTodos(todos);
    }
  }, [status, todos]);

  return (
    <>
      {!!todos.length && (
        <ul className="todo-list" data-cy="todoList">
          {filteredTodos.map((todo: Todo) => (
            <ToDoItem
              todo={todo}
              key={todo.id}
            />
          ))}
        </ul>
      )}
    </>
  );
};
