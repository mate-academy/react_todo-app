import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  onDeleteTodo: (todoId: number) => void,
  onChangeComplited: (todoId: number) => void,
  toggleAll: () => void,
};

export const TodoList: React.FC<Props> = ({
  todos, onDeleteTodo, onChangeComplited, toggleAll,
}) => {
  return (
    <div className="">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={() => toggleAll()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={() => onDeleteTodo(todo.id)}
            onChangeComplited={() => onChangeComplited(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};
