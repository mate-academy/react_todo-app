import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  filtredTodos: Todo[],
  isTodoLoading: boolean,
  deletedTodosId: number[],
  tempTodo: Todo | null,
  activeTodoId: number[],
  onDelete: (id: number) => void,
  hendeleCheckboxChange: (id: number, completed: boolean) => void,
  editTodo: (id: number, newTitle: string) => void,
  updatedTodoID: number[],
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    filtredTodos,
    isTodoLoading,
    onDelete,
    deletedTodosId,
    tempTodo,
    activeTodoId,
    hendeleCheckboxChange,
    editTodo,
    updatedTodoID,
  }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        <TransitionGroup>
          {filtredTodos.map(todoItem => (
            <CSSTransition
              key={todoItem.id}
              timeout={300}
              classNames="item"
            >
              <TodoInfo
                todoList={todoItem}
                key={todoItem.id}
                onDelete={onDelete}
                deletedTodosId={deletedTodosId}
                activeTodoId={activeTodoId}
                hendeleCheckboxChange={hendeleCheckboxChange}
                editTodo={editTodo}
                updatedTodoID={updatedTodoID}
              />
            </CSSTransition>
          ))}

          {isTodoLoading && tempTodo && (
            <CSSTransition
              key={0}
              timeout={300}
              classNames="temp-item"
            >
              <TodoInfo
                todoList={tempTodo}
                key={tempTodo.id}
                onDelete={onDelete}
                deletedTodosId={deletedTodosId}
                activeTodoId={activeTodoId}
                hendeleCheckboxChange={hendeleCheckboxChange}
                editTodo={editTodo}
                updatedTodoID={updatedTodoID}
              />
            </CSSTransition>
          )}
        </TransitionGroup>
      </section>
    );
  },
);
