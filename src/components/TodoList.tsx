import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../Context/TodoContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface Props {}

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {filteredTodos.map(todo => {
          return (
            <CSSTransition key={todo.id} timeout={500} classNames="item">
              <TodoItem todo={todo} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </section>
  );
};
