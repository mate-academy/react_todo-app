import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { FilterBy } from '../types/FilterBy';
import { TodosContextType } from '../types/TodosContext';
import { Footer } from './Footer';
import { FormCreateTodo } from './formCreateTodo';
import { TodosContext } from './todosContext';
import { TodoList } from './todoList';

export const TodoApp = () => {
  const {
    todos,
    addTodo,
    toogleALL,
  } = useContext(TodosContext) as TodosContextType;
  const { filterBy } = useParams();
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  useEffect(() => {
    const isAlltrue = todos.every(item => item.completed);

    setIsAllCompleted(isAlltrue);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.Active:
          return !todo.completed;

        case FilterBy.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filterBy]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <FormCreateTodo onSubmit={addTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={!isAllCompleted}
          onChange={() => toogleALL(isAllCompleted)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList todos={visibleTodos} />
      </section>

      <Footer />
    </div>
  );
};
