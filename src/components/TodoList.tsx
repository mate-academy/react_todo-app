import { FC } from 'react';
import { Todo } from '../types/Todo';
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
      {visibleTodos.map((todo: Todo, index: number) => {
        const isCurrentClicked = index === clickedIndex;

        const generateKey = (pre: number) => {
          return `${pre + index}_${new Date().getTime()}`;
        };

        return (
          <TodoComponent
            key={generateKey(todo.id)}
            isCurrentClicked={isCurrentClicked}
            visibleTodos={visibleTodos}
            setVisibleTodos={setVisibleTodos}
            clickedIndex={clickedIndex}
            setClickedIndex={setClickedIndex}
            todos={todos}
            todo={todo}
            index={index}
            setTodos={setTodos}
          />
        );
      })}
    </section>
  );
};
