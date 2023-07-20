import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleToggleCompleted: (todoId: number, completed: boolean) => void;
  handleRemoveTodo: (todoId: number) => void;
  handleChangeTitle: (todoId: number, newTitle: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleToggleCompleted,
  handleRemoveTodo,
  handleChangeTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleCompleted={handleToggleCompleted}
          handleRemoveTodo={handleRemoveTodo}
          handleChangeTitle={handleChangeTitle}
        />
      ))}
    </ul>
  );
};
