/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[],
  visibleTodos: Todo[],
  onSetTodos: (newValue: Todo[]) => void
  onCheckTodos: React.Dispatch<React.SetStateAction<boolean>>

}

// console.log('list')

export const TodoList: FC<Props> = ({
  todos,
  visibleTodos,
  onSetTodos,
  onCheckTodos,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todos={todos}
          crntTodo={todo}
          onSetTodos={onSetTodos}
          onCheckTodos={onCheckTodos}
        />
      ))}
    </ul>
  );
};
