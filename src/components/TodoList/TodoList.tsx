import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../styles/transitions.scss';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  removeTodo: (id: number) => void,
  updateTodo: (id: number, data: string | boolean) => void,
  setErrorText: (errorText : string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos, removeTodo, updateTodo, setErrorText,
}) => {
  return (
    <ul className="todoapp__main" data-cy="todosList">
      <TransitionGroup>
        {todos.map(todo => {
          return (
            <CSSTransition
              key={todo.id}
              timeout={200}
              classNames="item"
            >
              <TodoItem
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                setErrorText={setErrorText}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </ul>
  );
};
