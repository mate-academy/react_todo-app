import React, { useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { TodoItem } from '../TodoItem';

import { useAuth } from '../../hooks/useAuth';

import { Todo } from '../../types/Todo';
import { OnChangeFunc } from '../../types/OnChangeFunc';
import { OnShowErrorFunc } from '../../types/OnErrorFunc';

type Props = {
  todos: Todo[];
  activeTodosNum: number;
  tempTodoTitle: string;
  isClearCompleted: boolean;
  isAllToggled: boolean;
  showError: OnShowErrorFunc;
  hideError: () => void;
  onDeleteTodo: (todoId: number) => void;
  onChangeTodo: OnChangeFunc;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    activeTodosNum,
    tempTodoTitle,
    isClearCompleted,
    isAllToggled,
    onDeleteTodo,
    onChangeTodo,
    showError,
    hideError,
  }) => {
    const { id: userId } = useAuth();

    const tempTodo = useMemo(
      () => ({
        id: 0,
        userId,
        title: tempTodoTitle,
        completed: false,
      }),
      [userId, tempTodoTitle],
    );

    const isLoading = (isTodoCompleted: boolean): boolean => {
      const hasTodoToBeToggled = activeTodosNum === 0
        ? isTodoCompleted
        : !isTodoCompleted;
      const isTodoToggled = isAllToggled && hasTodoToBeToggled;

      return (isTodoCompleted && isClearCompleted) || isTodoToggled;
    };

    return (
      <section className="todoapp__main">
        <TransitionGroup>
          {todos.map((todo) => (
            <CSSTransition
              key={todo.id}
              timeout={300}
              classNames="item"
            >
              <TodoItem
                todo={todo}
                showError={showError}
                hideError={hideError}
                onDeleteTodo={onDeleteTodo}
                onChangeTodo={onChangeTodo}
                isLoading={isLoading(todo.completed)}
              />
            </CSSTransition>
          ))}

          {tempTodoTitle && (
            <CSSTransition
              key={0}
              timeout={300}
              classNames="temp-item"
            >
              <TodoItem
                todo={tempTodo}
                isLoading
              />
            </CSSTransition>
          )}
        </TransitionGroup>
      </section>
    );
  },
);
