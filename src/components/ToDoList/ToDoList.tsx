import { FC } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { Todo } from '../../types/Todo';
import { ToDo } from '../ToDo/ToDo';

type Props = {
  todos: Todo[];
  isTemp: boolean;
  onRemove: (todoId: number) => void
  deletingToDoId: number[];
  onStatusChange: (todoId: number, data: boolean) => void;
  onTitleChange: (todoId: number, title: string) => void;
};

export const ToDoList: FC<Props> = ({
  todos,
  onRemove,
  isTemp,
  deletingToDoId,
  onStatusChange,
  onTitleChange,
}) => {
  const isTodoEditing = (id: number) => {
    return deletingToDoId.includes(id);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>

        {todos.map((todo, i) => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <ToDo
              key={todo.id}
              todo={todo}
              onRemove={onRemove}
              isEditing={isTodoEditing(todo.id || 0)}
              onStatusChange={onStatusChange}
              onTitleChange={onTitleChange}
              isTemp={i === todos.length - 1 && isTemp}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
};
