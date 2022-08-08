import React, { FC } from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[]
  onChangeComplete: (completed: boolean, id: (number | undefined)) => void,
  onClickDelete: (id: number | undefined) => void;
  onPressEnter: (title: string, id: (number | undefined)) => void,
};

const TodoList: FC<Props> = ({
  todos,
  onChangeComplete,
  onClickDelete,
  onPressEnter,
}) => {
  const doubleClickHandler = (
    event: React.MouseEvent<HTMLLabelElement>,
  ): boolean => {
    return event.detail === 2;
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onChangeComplete={onChangeComplete}
            onClickDelete={onClickDelete}
            onDoubleClick={doubleClickHandler}
            onPressEnter={onPressEnter}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
