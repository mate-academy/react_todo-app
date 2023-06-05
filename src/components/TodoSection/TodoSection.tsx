import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  setTodos: (data: Todo[]) => void
};

export const TodoSection: React.FC<Props> = React.memo(({
  todos,
  setTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="todosList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              key={todo.id}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
});
