import React from 'react';
import { useGeneral } from './hooks/General';
import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const {
    addTodo,
    editTodo,
    deleteTodo,
    visibleTodos,
    todos,
    filter,
    setFilter,
    clear,
  } = useGeneral();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header addTodo={addTodo} todos={todos} toggle={clear} />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              ))}
            </section>
            <Footer
              todos={todos}
              filter={filter}
              setFilter={setFilter}
              clear={clear}
            />
          </>
        )}
      </div>
    </div>
  );
};
