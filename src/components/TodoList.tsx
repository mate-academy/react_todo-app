import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { ErrorMessage } from '../enums/error';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  deletedTodosId: number[] | [];
  handleDeletedTodo: (id: number) => void;
  handleUpdatedTodo: (id: number) => void;
  setDeletedTodosId: React.Dispatch<React.SetStateAction<number[] | []>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: React.Dispatch<React.SetStateAction<ErrorMessage>>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  deletedTodosId,
  handleDeletedTodo,
  handleUpdatedTodo,
  setDeletedTodosId,
  setTodos,
  setError,
}) => (
  <section className="todoapp__main">
    <TransitionGroup />
    {todos.map(todo => (
      <CSSTransition
        key={todo.id}
        timeout={300}
        classNames="item"
      >
        <TodoItem
          todo={todo}
          deletedTodosId={deletedTodosId}
          handleDeletedTodo={handleDeletedTodo}
          handleUpdatedTodo={handleUpdatedTodo}
          setDeletedTodosId={setDeletedTodosId}
          todos={todos}
          setTodos={setTodos}
          setError={setError}
        />
      </CSSTransition>
    ))}

    {!!tempTodo && (
      <CSSTransition
        key={0}
        timeout={300}
        classNames="temp-item"
      >
        <TodoItem
          todo={tempTodo}
          deletedTodosId={deletedTodosId}
          handleDeletedTodo={handleDeletedTodo}
          handleUpdatedTodo={handleUpdatedTodo}
          setDeletedTodosId={setDeletedTodosId}
          todos={todos}
          setTodos={setTodos}
          setError={setError}
        />
      </CSSTransition>
    )}
  </section>
);
