import React from 'react';
import { Todo } from '../Todo/Todo';
import { ITodo } from '../../types';
import { Section } from '../Section';
import { Toggler } from '../Toggler';

type Props = {
  todos: ITodo[]
  setTodos: (todos: ITodo[]) => void;
};

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const toggleTodoStatus = (todoId: number) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const editTodo = (todoId: number, newTitle: string) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    }));
  };

  return (
    <Section>

      <Toggler
        todos={todos}
        setTodos={setTodos}
      />

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
