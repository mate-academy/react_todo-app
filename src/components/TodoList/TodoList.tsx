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
  loading: Loading,
  renaming: Renaming,
  handleMarkChange: (id: number, isCompleted: boolean) => void,
  handleDeleteTodoClick: (id: number) => void,
  setRenaming: (obj: Renaming) => void,
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
    loading,
    renaming,
    handleMarkChange,
    handleDeleteTodoClick,
    setRenaming,
    handleRenamingSubmit,
  }) => (
    <section className="todoapp__main">
      <TodoItem
        todos={todos}
        loading={loading}
        renaming={renaming}
        handleMarkChange={handleMarkChange}
        handleDeleteTodoClick={handleDeleteTodoClick}
        setRenaming={setRenaming}
        handleRenamingSubmit={handleRenamingSubmit}
      />

      {tempTodo && (
        <TempTodoItem todoTitle={todoTitle} />
      )}
    </section>
  ),
);
