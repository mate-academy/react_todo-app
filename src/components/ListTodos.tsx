/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/types';
import { ItemTodo } from './ItemTodo';

type Props = {
  todos: Todo[];
  setTodos: (str: Todo[]) => void;
};

export const ListTodos: React.FC<Props> = ({ todos, setTodos }) => {
  const deleteTodo = (id: any) => {
    return setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <ItemTodo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};
