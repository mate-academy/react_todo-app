import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './styles.scss';
import { TodoInfo } from '../TodoInfo';
import { Props } from './Props';

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onUpdate,
  isProcessing,
  isCreated,
  newTodo,
}) => (
  <ul className="todoapp__main" data-cy="TodoList">
    <TransitionGroup>
      {todos.map(todo => (
        <CSSTransition
          key={todo.id}
          timeout={300}
          classNames="item"
        >
          <TodoInfo
            todo={todo}
            isProcessing={isProcessing}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </CSSTransition>
      ))}

      {isCreated && (
        <CSSTransition
          key={0}
          timeout={300}
          classNames="temp-item"
        >
          <TodoInfo
            todo={newTodo}
            isProcessing={isProcessing}
            onDelete={onDelete}
            onUpdate={onUpdate}
            data-cy="NewTodoField"
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  </ul>
);
