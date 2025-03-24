import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  loadTodos: number[];
  onChange?: (todos: Todo[]) => void;
  onLoadTodos: (loadTodos: number[]) => void;
  onDelete?: (todoId: number) => void;
  onChangeChecked?: (todoId: number, checked: boolean) => void;
  onChangeTitle?: (todoId: number, newTodo: string) => void;
  onError?: (error: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  loadTodos,
  onLoadTodos,
  onChange = () => {},
  onDelete = () => {},
  onChangeChecked = () => {},
  onError = () => {},
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="item">
            <TodoInfo
              todo={todo}
              todos={todos}
              key={todo.id}
              loadTodos={loadTodos}
              onLoad={onLoadTodos}
              onDelete={onDelete}
              onError={onError}
              onChange={onChange}
              onChangeChecked={onChangeChecked}
            />
          </CSSTransition>
        ))}
        {tempTodo && (
          <CSSTransition key={Date.now()} timeout={300} classNames="temp-item">
            <TodoInfo
              todo={tempTodo}
              key={`-${tempTodo.id}`}
              loadTodos={loadTodos}
              onLoad={onLoadTodos}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
