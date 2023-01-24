import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TempTodo } from '../TempTodo/TempTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[],
  deleteTodoHandler: (todoId: number) => void,
  deletedTodosIds: number[],
  onToggleTodo: (todoIt: number, completed: boolean) => void,
  handleChangeTodoTittle: (todoId: number, title: string) => void,
  selectedTodoId: number[],
  isAdding: boolean,
  newTodoTitle: string,
}

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodoHandler,
  deletedTodosIds,
  onToggleTodo,
  handleChangeTodoTittle,
  selectedTodoId,
  isAdding,
  newTodoTitle,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        <ul className="todo__list">
          {todos.map(todo => (
            <CSSTransition
              key={todo.id}
              timeout={300}
              classNames="item"
            >
              <li key={todo.id} className="todo__item">
                <TodoInfo
                  todo={todo}
                  deleteTodoHandler={deleteTodoHandler}
                  deletedTodosIds={deletedTodosIds}
                  onToggleTodo={onToggleTodo}
                  handleChangeTodoTittle={handleChangeTodoTittle}
                  selectedTodoId={selectedTodoId}
                />
              </li>
            </CSSTransition>
          ))}
        </ul>
        {isAdding && (
          <CSSTransition
            key={0}
            timeout={300}
            classNames="temp-item"
          >
            <TempTodo newTodoTitle={newTodoTitle} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
