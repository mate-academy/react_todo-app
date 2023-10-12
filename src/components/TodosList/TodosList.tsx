import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  tempTodo: Todo | null,
  deleteCurrentTodo: (todoId: number) => void,
  updateCurrentTodo: (todoId: number, data: Partial<Todo>) => void,
};

export const TodosList: React.FC<Props> = ({
  todos,
  tempTodo,
  deleteCurrentTodo,
  updateCurrentTodo,
}) => {
  return (
    <section className="todoapp__main">
      <TransitionGroup component={null}>
        {todos.map(({ id, title, completed }) => (
          <CSSTransition
            key={id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              id={id}
              title={title}
              completed={completed}
              deleteCurrentTodo={deleteCurrentTodo}
              updateCurrentTodo={updateCurrentTodo}
            />
          </CSSTransition>
        ))}
        {tempTodo && (
          <CSSTransition
            key={0}
            timeout={300}
            classNames="temp-item"
          >
            <TodoItem
              id={0}
              title={tempTodo.title}
              completed={tempTodo.completed}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
