import React, { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TempTodo } from './TempTodo';

type Props = {
  items: Todo[]
  todosGetter: () => void
  setDeleteError: (errorState: boolean) => void
  setPostError: (errorState: boolean) => void
  tempTodo: string | null
  inputValue: string
  isClearCompleted: boolean
  toggleActive: boolean
  toggleCompleted: boolean
};

export const TodoList: FC<Props> = React.memo(
  ({
    todosGetter,
    setDeleteError,
    setPostError,
    items,
    tempTodo,
    inputValue,
    isClearCompleted,
    toggleActive,
    toggleCompleted,
  }) => {
    return (
      <>
        <ul className="todo-list" data-cy="todoList">
          {items.map(item => {
            return (
              <TodoItem
                key={item.id}
                todo={item}
                todosGetter={todosGetter}
                setDeleteError={setDeleteError}
                setPostError={setPostError}
                isClearCompleted={isClearCompleted}
                toggleActive={toggleActive}
                toggleCompleted={toggleCompleted}
              />
            );
          })}
          {tempTodo && (
            <TempTodo title={inputValue} />
          )}
        </ul>
      </>
    );
  },
);
