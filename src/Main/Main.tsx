import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useMemo } from 'react';
import { Todo } from '../utils/types/type';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo [],
  setTodos: (todos: Todo[]) => void,
  setProcessingIds: (ids: number[]) => void,
  processingIds: number[],
};

export const Main:React.FC<Props> = ({
  todos, setTodos, setProcessingIds, processingIds,
}) => {
  const location = useLocation();
  const pathName = location.pathname.slice(1);
  const handlerToggleAll = () => {
    const toggleVector = !!todos.some(todo => todo.completed === false);

    setProcessingIds(toggleVector
      ? todos
        .filter(todo => todo.completed !== toggleVector)
        .map(todo => todo.id)
      : todos.map(todo => todo.id));

    setTodos(todos.map(todo => {
      return {
        ...todo,
        completed: toggleVector,
      };
    }));
  };

  const checkedToggleAll = useMemo(() => todos
    .some(todo => !todo.completed), [todos]);

  const filteredTodos = () => {
    if (['completed', 'active'].includes(pathName)) {
      return todos.filter(item => (pathName === 'active'
        ? !item.completed : item.completed));
    }

    return todos;
  };

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={checkedToggleAll}
            onClick={handlerToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todoList">
        <TransitionGroup className="todo-list">
          {filteredTodos().map((item) => (
            <CSSTransition
              key={item.id}
              timeout={500}
              classNames="item"
            >
              <TodoItem
                item={item}
                setTodos={setTodos}
                todos={todos}
                isProcessing={processingIds}
                setIsProcessing={setProcessingIds}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </section>
  );
};
