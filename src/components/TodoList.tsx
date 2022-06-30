import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ITodo from '../models/Todo';
import { StateContext } from '../StateContext';
import TodoItem from './TodoItem';

type Props = {
  handleRemoveTodo: (id: number) => void;
  updateTodo: (id: number, payload: {}) => void;
  sortBy: string;
}

const TodoList: React.FC<Props> = ({
  handleRemoveTodo,
  updateTodo,
  sortBy,
}) => {
  const { todos } = useContext(StateContext);

  let visibleTodos = [...todos];

  switch (sortBy) {
    case 'completed':
      visibleTodos = visibleTodos.filter(
        (todo: ITodo) => todo.completed === true,
      );
      break;
    case 'active':
      visibleTodos = visibleTodos.filter(
        (todo: ITodo) => todo.completed === false,
      );
      break;
    default:
      break;
  }

  return (
    <ul className="todo-list">
      <TransitionGroup>
        {visibleTodos.map((todo: ITodo) => (
          <CSSTransition
            key={todo.id}
            timeout={500}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              handleRemoveTodo={handleRemoveTodo}
              updateTodo={updateTodo}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>

  );
};

export default TodoList;
