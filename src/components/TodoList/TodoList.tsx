/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useMemo, useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosDataContext } from '../../contexts';
import { Todo } from '../../types/Todo';
import { FilterParams } from '../../types/FilterParams';

const initialTodo: Todo = {
  title: '',
  completed: false,
  id: -1,
};

export const TodoList: React.FC = () => {
  const [activeTodo, setActiveTodo] = useState<Todo>(initialTodo);
  const { todos, showTodosByStatus } = useContext(TodosDataContext);

  const shownTodos = useMemo(() => {
    switch (showTodosByStatus) {
      case FilterParams.all:
        return [...todos];
      case FilterParams.active:
        return todos.filter(t => !t.completed);
      case FilterParams.completed:
        return todos.filter(t => t.completed);
    }
  }, [todos, showTodosByStatus]); // Fillter todos

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {shownTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          activeTodo={activeTodo}
          onChangeActiveTodo={t => setActiveTodo(t)}
        />
      ))}
    </section>
  );
};
