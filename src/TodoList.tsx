import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from './react-app-env';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const [editTodoId, setEditTodoId] = useState(0);
  const { pathname } = useLocation();
  const filter = () => {
    if (pathname === '/active') {
      return todos.filter(todo => !todo.completed);
    }

    if (pathname === '/completed') {
      return todos.filter(todo => todo.completed);
    }

    if (pathname === '/') {
      return todos;
    }

    return todos;
  };

  const todosFilter = useMemo(() => {
    return filter();
  }, [todos, pathname]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todosFilter.map(todo => (
        <li
          key={todo.id}
          className={classNames({
            completed: todo.completed,
            editing: editTodoId === todo.id,
          })}
        >
          <TodoItem
            todos={todos}
            setTodos={setTodos}
            todo={todo}
            editTodoId={editTodoId}
            setEditTodoId={setEditTodoId}
          />
        </li>
      ))}
    </ul>
  );
};
