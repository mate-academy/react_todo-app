import React, { useContext } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';
import { ContextTodos } from '../Context/ContextTodos';
import { TodoItem } from '../TodoItem';

import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList:React.FC<Props> = React.memo(({ todos }) => {
  const { isAddingTodo, title } = useContext(ContextTodos);
  const { user } = useContext(AuthContext);
  const userId = user?.id || 0;

  return (
    <TransitionGroup className="todo-list" data-cy="todoList">
      {todos?.map(todo => (
        <CSSTransition
          key={todo.id}
          timeout={300}
          classNames="item"
          enter
        >
          <TodoItem todo={todo} />
        </CSSTransition>
      ))}

      {isAddingTodo && (
        <CSSTransition
          key={0}
          timeout={300}
          classNames="item"
          enter
        >
          <TodoItem todo={{
            id: 0,
            userId,
            completed: false,
            title,
          }}
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  );
});
