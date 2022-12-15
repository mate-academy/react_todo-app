import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onDelete: (id: number) => Promise<void>;
  isAdding: boolean;
  activeTodoID: number[];
  changeTodo: (todo: Todo, title: string, completed: boolean) => Promise<void>;
  showError: (message: Errors) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  activeTodoID,
  changeTodo,
  isAdding,
  showError,
}) => {
  return (
    <ul className="todoapp__main" data-cy="todosList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              onDelete={onDelete}
              activeTodoID={activeTodoID}
              changeTodo={changeTodo}
              isAdding={isAdding}
              showError={showError}
            />

          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
