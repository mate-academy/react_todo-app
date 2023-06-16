import { useMemo } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todos: Todo[],
  tempoTodo: Todo | null,
  loadingTodoIds: number[];
  handleTodoRemove: (id: number) => void,
  handleUpdateTodo: (id: number, data: boolean | string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempoTodo,
  loadingTodoIds,
  handleTodoRemove,
  handleUpdateTodo,
}) => {
  const { pathname } = useLocation();

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (pathname) {
        case TodoStatus.Active:
          return !todo.completed;
        case TodoStatus.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, pathname]);

  return (
    <ul className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {filteredTodos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              key={todo.id}
              todo={todo}
              loadingTodoIds={loadingTodoIds}
              handleTodoRemove={handleTodoRemove}
              handleUpdateTodo={handleUpdateTodo}
            />
          </CSSTransition>
        ))}

        {tempoTodo && (
          <CSSTransition
            timeout={300}
            classNames="temp-item"
          >
            <TodoItem
              todo={tempoTodo}
              key={0}
              loadingTodoIds={loadingTodoIds}
              handleTodoRemove={handleTodoRemove}
              handleUpdateTodo={handleUpdateTodo}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </ul>
  );
};
