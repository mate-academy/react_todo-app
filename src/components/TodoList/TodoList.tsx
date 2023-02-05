import { FC, memo } from 'react';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  filteredTodos: Todo[];
  isAdding: boolean;
  tempTodo: Todo;
  todoIdsLoading: number[];
  removeTodoFromServer: (todoId: number) => void;
  toggleTodoStatusOnServer: (todoId: number, status: boolean) => Promise<void>;
  changeTodoTitleOnServer: (todoId: number, newTitle: string) => Promise<void>;
}

export const TodoList: FC<Props> = memo(({
  filteredTodos,
  isAdding,
  tempTodo,
  todoIdsLoading,
  removeTodoFromServer,
  toggleTodoStatusOnServer,
  changeTodoTitleOnServer,
}) => (
  <main className="todoapp__main" data-cy="TodoList">
    <ul>
      <TransitionGroup component={null}>
        {filteredTodos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              key={todo.id}
              todo={todo}
              isLoading={todoIdsLoading.includes(todo.id)}
              removeTodoFromServer={removeTodoFromServer}
              toggleTodoStatusOnServer={toggleTodoStatusOnServer}
              changeTodoTitleOnServer={changeTodoTitleOnServer}
            />
          </CSSTransition>
        ))}

        {isAdding && (
          <CSSTransition
            key={tempTodo.id}
            timeout={300}
            classNames="temp-item"
          >
            <TodoItem
              todo={tempTodo}
              isLoading={isAdding}
              toggleTodoStatusOnServer={toggleTodoStatusOnServer}
              changeTodoTitleOnServer={changeTodoTitleOnServer}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </ul>
  </main>
));
