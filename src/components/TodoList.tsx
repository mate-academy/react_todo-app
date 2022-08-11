import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  changeTodoStatus: (completed: boolean, todoId:number) => void;
  deleteTodo: (todoId:number) => void;
  editTitle: (todoTitle:string, todoId:number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  changeTodoStatus,
  deleteTodo,
  editTitle,
}) => {
  return (

    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
          editTitle={editTitle}
        />
      ))}
    </ul>
  );
};
