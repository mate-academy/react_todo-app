import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  onHandleChangeTodo(data: object, id: number): void,
  onDelete: (id: number) => void,
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  onHandleChangeTodo,
  onDelete,
  todos,
}) => {
  return (
    <section className="todoTodoPage__main">
      <ul className="todo-list" data-cy="todoList">
        <TransitionGroup>
          {todos.map(todo => (
            <CSSTransition
              key={todo.id}
              timeout={300}
              classNames="item"
            >
              <TodoItem
                todo={todo}
                onDelete={onDelete}
                onHandleChangeTodo={onHandleChangeTodo}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </section>
  );
};
