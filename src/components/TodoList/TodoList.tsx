import React, { useContext, useState } from 'react';
import { TodosContext } from '../../contexts/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { Footer } from '../Footer/Footer';
import { getTodosFromLocalStorage } from '../../utils/getTodosFromLocalStorage';
import { Query } from '../../enums/Query';

export const TodoList: React.FC = () => {
  const {
    data: { visibleTodos },
  } = useContext(TodosContext);

  const [query, setQuery] = useState<Query>(Query.All);

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {/* This is a completed todo */}
        {visibleTodos
          .filter(todo => {
            switch (query) {
              case Query.All:
                return true;
              case Query.Active:
                return !todo.isCompleted;
              case Query.Completed:
                return todo.isCompleted;
            }
          })
          .map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
      </section>
      {/* Hide the footer if there are no todos */}
      {getTodosFromLocalStorage().length !== 0 ? (
        <Footer query={query} setQuery={setQuery} />
      ) : null}
    </>
  );
};
