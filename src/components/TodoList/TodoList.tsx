import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  isSomeTodos: boolean,
  areAllCompleted: boolean,
  onToggleComplete: (todoId: number) => void,
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onDeleteTodo: (todoId: number) => void,
  onPatchTodo: (todoId: number, title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  isSomeTodos,
  areAllCompleted,
  onToggleComplete,
  onToggleAll,
  onDeleteTodo,
  onPatchTodo,
}) => (
  <section className="main">
    {isSomeTodos && (
      <>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={areAllCompleted}
          onChange={onToggleAll}
        />

        <label htmlFor="toggle-all">Mark all as complete</label>
      </>
    )}

    <ul className="todo-list" data-cy="todoList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={800}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              key={todo.id}
              onHandleToggleComplete={onToggleComplete}
              onDeleteTodo={onDeleteTodo}
              onPatchTodo={onPatchTodo}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  </section>
);
