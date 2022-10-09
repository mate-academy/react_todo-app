import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  isToggleClicked: boolean,
  isAdding: boolean,
  isClearButtonClicked: boolean,
  setNotification: React.Dispatch<React.SetStateAction<string>>,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  isToggleClicked,
  isAdding,
  isClearButtonClicked,
  setNotification,
}) => (
  <section className="todoapp__main" data-cy="TodoList">

    {todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        setTodos={setTodos}
        isToggleClicked={isToggleClicked}
        isAdding={isAdding}
        allTodos={todos}
        isClearButtonClicked={isClearButtonClicked}
        setNotification={setNotification}
      />
    ))}

  </section>
);
