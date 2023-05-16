import React, { FormEvent, FocusEvent } from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[],
  creating: Todo | null
  selectedId: number | null
  editedTodoId: number | null
  newTitle: string
  onChangeTodoTitle: (
    event: FormEvent<HTMLFormElement> | FocusEvent<HTMLInputElement>
  ) => void
  onAddNewTitle: (value: string) => void
  onEditedTodoId: (value: number | null) => void
  onDelete: (todoId: number) => void
  onToggle: (todoId: number, check: boolean) => void
}

export const TodoList: React.FC<Props> = ({
  todos,
  creating,
  selectedId,
  editedTodoId,
  newTitle,
  onDelete,
  onToggle,
  onEditedTodoId,
  onAddNewTitle,
  onChangeTodoTitle,
}) => {
  return (
    <section className="todoapp__main">
      <TransitionGroup>

        {todos.map(todo => {
          return (
            <CSSTransition
              key={todo.id}
              timeout={300}
              classNames="item"
            >
              <TodoItem
                todo={todo}
                selectedId={selectedId}
                editedTodoId={editedTodoId}
                newTitle={newTitle}
                onDelete={onDelete}
                onToggle={onToggle}
                onEditedTodoId={onEditedTodoId}
                onAddNewTitle={onAddNewTitle}
                onChangeTodoTitle={onChangeTodoTitle}
              />
            </CSSTransition>
          );
        })}

        {creating !== null
          && (
            <CSSTransition
              key={0}
              timeout={300}
              classNames="temp-item"
            >
              <TodoItem
                todo={creating}
                selectedId={selectedId}
                editedTodoId={editedTodoId}
                newTitle={newTitle}
                onDelete={onDelete}
                onToggle={onToggle}
                onEditedTodoId={onEditedTodoId}
                onAddNewTitle={onAddNewTitle}
                onChangeTodoTitle={onChangeTodoTitle}
              />
            </CSSTransition>
          )}
      </TransitionGroup>
    </section>
  );
};
