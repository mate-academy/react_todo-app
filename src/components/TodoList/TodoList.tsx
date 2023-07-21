import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleToggleCompleted: (todoId: number, completed: boolean) => void;
  handleRemoveTodo: (todoId: number) => void;
  handleChangeTitle: (todoId: number, newTitle: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleToggleCompleted,
  handleRemoveTodo,
  handleChangeTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      <TransitionGroup>
        {todos.map((todo) => (
          <CSSTransition key={todo.id} timeout={500} classNames="fade">
            <TodoItem
              todo={todo}
              handleToggleCompleted={handleToggleCompleted}
              handleRemoveTodo={handleRemoveTodo}
              handleChangeTitle={handleChangeTitle}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
