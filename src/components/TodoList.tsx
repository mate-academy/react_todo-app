import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  tempTodo: Todo | null,
  processedTodos: number[],
  onUpdateTodo: (todo: Todo) => void,
  onUpdateTitle: (todo: Todo, newTitle: string) => void,
  onDelete: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  processedTodos,
  onUpdateTodo,
  onUpdateTitle,
  onDelete,
}) => {
  return (
    <section className="todoapp__main">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              key={todo.id}
              processedTodos={processedTodos}
              onUpdateTodo={onUpdateTodo}
              onUpdateTitle={onUpdateTitle}
              onDelete={onDelete}
            />
          </CSSTransition>
        ))}

        {tempTodo && (
          <CSSTransition
            timeout={300}
            classNames="temp-item"
          >
            <TodoItem
              todo={tempTodo}
              processedTodos={processedTodos}
              onUpdateTodo={onUpdateTodo}
              onUpdateTitle={onUpdateTitle}
              onDelete={onDelete}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
