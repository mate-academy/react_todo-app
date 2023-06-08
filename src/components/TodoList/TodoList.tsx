import { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: (data: Todo[]) => void
};

export const TodoList: FC<Props> = ({ todos, setTodos }) => {
  return (
    <TransitionGroup component="ul" className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <CSSTransition
          key={todo.id}
          timeout={300}
          classNames="item"
        >
          <TodoItem
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            key={todo.id}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
