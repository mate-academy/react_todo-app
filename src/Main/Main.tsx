/* eslint-disable jsx-a11y/control-has-associated-label */

import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../utils/types/type';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo [],
  setTodos: (todos: Todo[]) => void,
  setIsProcessing: (ids: number[]) => void,
  isProcessing: number[],
};

export const Main:React.FC<Props> = ({
  todos, setTodos, setIsProcessing, isProcessing,
}) => {
  const location = useLocation();
  const pathName = location.pathname.slice(1);
  const handlerToggleAll = () => {
    const toggleVector = !!todos.some(todo => todo.completed === false);

    setIsProcessing(toggleVector
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

  const filteredTodos = () => {
    if (['completed', 'active'].includes(pathName)) {
      return todos.filter(item => (pathName === 'active'
        ? !item.completed : item.completed));
    }

    return todos;
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={todos.some(todo => !todo.completed)}
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
                key={item.id}
                setTodos={setTodos}
                todos={todos}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </section>
  );
};
