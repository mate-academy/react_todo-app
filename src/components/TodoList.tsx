import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Action } from '../enums/Action';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  dispatch: React.Dispatch<{ type: Action, payload?: unknown }>,
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    dispatch,
  }) => {
    return (
      <section className="todoapp__main">
        <TransitionGroup as="ul" data-cy="todosList">
          {todos.map((todo) => (
            <CSSTransition
              key={todo.id}
              timeout={300}
              classNames="item"
            >
              <TodoItem
                todo={todo}
                dispatch={dispatch}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </section>
    );
  },
);
