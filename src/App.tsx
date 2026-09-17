import { useRef, useState, type FC } from 'react';

import { Footer } from './components/Footer';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodosProvider, useTodos } from './context/TodosContext';
import { FILTERS, type Filter as FilterType } from './types/Filter';

const TodoApp: FC = () => {
  const { todos, deleteTodo } = useTodos();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(FILTERS.all);
  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  const visibleTodos = todos.filter(todo => {
    switch (selectedFilter) {
      case FILTERS.active:
        return !todo.completed;

      case FILTERS.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  const focusNewTodoField = () => {
    newTodoFieldRef.current?.focus();
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId);
    focusNewTodoField();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo inputRef={newTodoFieldRef} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} onDelete={handleDeleteTodo} />
            <Footer
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              onClearCompleted={focusNewTodoField}
            />
          </>
        )}
      </div>
    </div>
  );
};

export const App: FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);
