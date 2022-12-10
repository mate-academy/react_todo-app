import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  isAdding: boolean,
  processingTodos: number[],
  addingTitle: string,
  handleDeleteTodo: (todoId: number) => Promise<void>,
  handleUpdateTodo: (updatedTodo: Todo) => Promise<void>;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  isAdding,
  processingTodos,
  addingTitle,
  handleDeleteTodo,
  handleUpdateTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="todosList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              isProcessed={processingTodos.includes(todo.id)}
              handleDeleteTodo={() => handleDeleteTodo(todo.id)}
              handleUpdateTodo={handleUpdateTodo}
            />
          </CSSTransition>
        ))}

        {isAdding && (
          <CSSTransition
            key={0}
            timeout={300}
            classNames="temp-item"
          >
            <TodoItem
              todo={{
                id: 0,
                title: addingTitle,
                completed: false,
                userId: 0,
              }}
              isProcessed
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
});
