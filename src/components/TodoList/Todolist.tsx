import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../type';
import { TodoItem } from '../TodoItem';

interface Props {
  todoList: Todo[]
  onDelete: (id: number | undefined) => void
  onCompletedChange: (id: number | undefined) => void
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  useServer: boolean
}

export const TodoList: FC<Props> = ({
  todoList,
  onDelete,
  onCompletedChange,
  setVisibleTodos,
  useServer,
}) => {
  let visibelTodos = [...todoList];
  const { pathname } = useLocation();

  visibelTodos = visibelTodos.filter(todo => {
    switch (pathname) {
      case '/completed':
        return todo.completed;
      case '/active':
        return !todo.completed;
        break;

      default:
        return todo;
        break;
    }
  });

  return (

    <ul className="todo-list" data-cy="todoList">
      {visibelTodos.map(todo => (
        <React.Fragment key={todo.id}>
          <TodoItem
            todo={todo}
            onDelete={onDelete}
            onCompletedChange={onCompletedChange}
            setVisibleTodos={setVisibleTodos}
            useServer={useServer}
          />
        </React.Fragment>

      ))}

    </ul>
  );
};
