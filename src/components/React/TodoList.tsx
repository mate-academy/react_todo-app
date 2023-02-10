import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Todo } from '../../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
  filter: string,
  todoOnLoad: Todo | null,
  todoIdsOnLoad: number[],
  onTodoDelete: (id: number) => void,
  onTodoComplete: (todo: Todo) => void,
  saveInputChange: (id: number, title: string) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
  todoOnLoad,
  todoIdsOnLoad,
  onTodoDelete,
  onTodoComplete,
  saveInputChange,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos
          .filter(todo => {
            switch (filter) {
              case 'active':
                return !todo.completed;

              case 'completed':
                return todo.completed;

              default: return todo;
            }
          })
          .map(todo => {
            return (
              <CSSTransition
                key={todo.id}
                timeout={300}
                classNames="item"
              >
                <TodoInfo
                  todo={todo}
                  key={todo.id}
                  todoIdsOnLoad={todoIdsOnLoad}
                  onTodoDelete={onTodoDelete}
                  onTodoComplete={onTodoComplete}
                  saveInputChange={saveInputChange}
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
              todoIdsOnLoad={todoIdsOnLoad}
              onTodoDelete={onTodoDelete}
              onTodoComplete={onTodoComplete}
              saveInputChange={saveInputChange}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
