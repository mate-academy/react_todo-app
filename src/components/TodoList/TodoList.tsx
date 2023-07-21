import React, { useContext } from 'react';
import { Todo } from '../Todo/Todo';
import { ITodo } from '../../types';
import { Section } from '../Section';
import { Toggler } from '../Toggler';
import { DispatchContext } from '../Store';

type Props = {
  todos: ITodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useContext(DispatchContext);

  const deleteTodo = (todoId: number) => {
    dispatch({ type: 'DELETE_TODO', payload: todoId });
  };

  const toggleTodoStatus = (todoId: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: todoId });
  };

  const editTodo = (todoId: number, newTitle: string) => {
    dispatch({ type: 'EDIT_TODO', payload: { id: todoId, title: newTitle } });
  };

  return (
    <Section>

      <Toggler />

      <ul className="todo-list" data-cy="todosList">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            toggleTodoStatus={toggleTodoStatus}
          />
        ))}
      </ul>
    </Section>
  );
};
