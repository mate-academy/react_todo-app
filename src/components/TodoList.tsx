import { FC } from 'react';
import { Todo } from '../types/Todo';
import { generateKey } from '../utils/generateKey';
import { TodoComponent } from './Todo/Todo';

type Props = {
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setClickedIndex: React.Dispatch<React.SetStateAction<number>>,
  clickedIndex: number,
  visibleTodos: Todo[],
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoList: FC<Props> = ({
  setVisibleTodos,
  clickedIndex,
  setClickedIndex,
  visibleTodos,
  todos,
  setTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo: Todo, index: number) => (
        <TodoComponent
          key={generateKey(todo.id, index)}
          isCurrentClicked={index === clickedIndex}
          visibleTodos={visibleTodos}
          setVisibleTodos={setVisibleTodos}
          clickedIndex={clickedIndex}
          setClickedIndex={setClickedIndex}
          todos={todos}
          todo={todo}
          index={index}
          setTodos={setTodos}
        />
      ))}
    </section>
  );
};
