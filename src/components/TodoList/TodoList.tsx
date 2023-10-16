import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type TodoListProps = {
  items: Todo[],
  handleDeleteTodo: (todoId: number) => void,
  handleUpdateTodo: (
    todoId: number, data: { [key: string]: string | boolean }
  ) => void,
};

export const TodoList: React.FC<TodoListProps> = ({
  items,
  handleDeleteTodo,
  handleUpdateTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      <TransitionGroup>
        {items.map(item => (
          <CSSTransition
            key={item.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              key={item.id}
              todo={item}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodo={handleUpdateTodo}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
