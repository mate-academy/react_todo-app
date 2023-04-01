import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { Todo } from '../../types/Todo';

import TodoItem from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  changeTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
};

const TodoList: React.FC<Props> = ({
  todos,
  changeTodo,
  removeTodo,
}) => (
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
            changeTodo={changeTodo}
            removeTodo={removeTodo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  </ul>
);

export default TodoList;
