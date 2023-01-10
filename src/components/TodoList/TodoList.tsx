import React from 'react';
import { Todo } from '../../types/Todo';
import { Loading } from '../../types/Loading';
import { Renaming } from '../../types/Renaming';
import { TodoItem } from '../TodoItem';
import { TempTodoItem } from '../TempTodoItem';

type Props = {
  todos: Todo[],
  tempTodo: boolean,
  todoTitle: string,
  isLoading: Loading,
  isRenaming: Renaming,
  handleMarkChange: (id: number, isCompleted: boolean) => void,
  handleDeleteTodoClick: (id: number) => void,
  setIsRenaming: (obj: Renaming) => void,
  handleRenamingSubmit: (
    e: React.FormEvent,
    id: number,
    prevTitle: string,
    title: string,
  ) => void,
};

export const TodoList: React.FC<Props> = React.memo(

  ({
    todos,
    tempTodo,
    todoTitle,
    isLoading,
    isRenaming,
    handleMarkChange,
    handleDeleteTodoClick,
    setIsRenaming,
    handleRenamingSubmit,
  }) => (
    <section className="todoapp__main">
      <TodoItem
        todos={todos}
        isLoading={isLoading}
        isRenaming={isRenaming}
        handleMarkChange={handleMarkChange}
        handleDeleteTodoClick={handleDeleteTodoClick}
        setIsRenaming={setIsRenaming}
        handleRenamingSubmit={handleRenamingSubmit}
      />

      {tempTodo && (
        <TempTodoItem todoTitle={todoTitle} />
      )}
    </section>
  ),
);
