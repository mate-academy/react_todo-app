import { useContext, useMemo, useState } from 'react';

import { Footer } from '../Footer';
import { Header } from '../Header/Header';
import { Main } from '../Main';
import { DisdatchContext, StateContext } from '../Store';
import { Filters } from '../../types/Filters';

export const Content = () => {
  const [focusSignal, setFocusSignal] = useState(0);

  const dispatch = useContext(DisdatchContext);
  const { todos, filter } = useContext(StateContext);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filters.Active:
        return todos.filter(todo => !todo.completed);

      case Filters.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  //#region Changes
  const addTodo = (title: string) =>
    dispatch({
      type: 'add',
      payload: {
        id: +new Date(),
        title: title,
        completed: false,
      },
    });

  const deleteTodo = (id: number) => {
    dispatch({
      type: 'delete',
      payload: { id: id },
    });

    setFocusSignal(prev => prev + 1);
  };

  const filterTodos = (currentFilter: Filters) => {
    dispatch({ type: 'set_filter', payload: currentFilter });
  };

  const clearCompletedTodo = () => {
    dispatch({ type: 'set_clear_completed' });
    setFocusSignal(prev => prev + 1);
  };

  const handleTodoStatusUpdate = (id: number, completed: boolean) => {
    dispatch({
      type: 'update_status',
      payload: { id: id, completed: completed },
    });
    setFocusSignal(prev => prev + 1);
  };

  const handleToggleAllButton = () => {
    dispatch({ type: 'set_all_toggle' });
    setFocusSignal(prev => prev + 1);
  };

  const handleTodoTitleUpdate = (id: number, title: string) => {
    dispatch({
      type: 'update_title',
      payload: { id: id, title: title },
    });
    setFocusSignal(prev => prev + 1);
  };
  //#endregion

  return (
    <div className="todoapp__content">
      <Header
        onSubmit={addTodo}
        focusSignal={focusSignal}
        onToggleAllButton={handleToggleAllButton}
      />

      <Main
        todos={visibleTodos}
        TodoDeleteButton={deleteTodo}
        onStatusUpdate={handleTodoStatusUpdate}
        onTitleUpdate={handleTodoTitleUpdate}
      />

      {/* Hide the footer if there are no todos */}
      {todos.length !== 0 && (
        <Footer
          current={filter}
          onFilterChange={filterTodos}
          onClearCompleted={clearCompletedTodo}
        />
      )}
    </div>
  );
};
