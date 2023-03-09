import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Todo } from '../../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
  todoOnLoad: Todo | null,
  todoIdsOnLoad: number[],
  onTodoDelete: (id: number) => void,
  onTodoComplete: (todo: Todo) => void,
  saveInputChange: (id: number, title: string) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  todoOnLoad,
  todoIdsOnLoad,
  onTodoDelete,
  onTodoComplete,
  saveInputChange,
}) => {
  const todoListPropPack = {
    todoIdsOnLoad,
    onTodoDelete,
    onTodoComplete,
    saveInputChange,
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos.map(todo => {
          return (
            <CSSTransition
              key={todo.id}
              timeout={300}
              classNames="item"
            >
              <TodoInfo
                key={todo.id}
                todo={todo}
                {...todoListPropPack}
              />
            </CSSTransition>
          );
        })}

        {todoOnLoad && (
          <CSSTransition
            key={0}
            timeout={300}
            classNames="temp-item"
          >
            <TodoInfo
              todo={todoOnLoad}
              {...todoListPropPack}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
