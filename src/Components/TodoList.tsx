// eslint-disable-next-line import/no-extraneous-dependencies
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodoData } from '../hooks/useTodoData';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodoData();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup component={null}>
        {filteredTodos.map(todo => {
          return (
            <CSSTransition
              key={`todo-${todo.id}`}
              timeout={300}
              classNames="item"
              appear={true}
            >
              <TodoItem todo={todo} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </section>
  );
};
