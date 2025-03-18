import React, { useState } from 'react';
import { useTodos } from './component/TodoContext';
import { Header } from './component/Header';
import { TodoList } from './component/TodoList';
import { Footer } from './component/Footer';
import { TodoFilter } from './type/TodosContexType';

export const App: React.FC = () => {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
    updateTodoTitle,
    toggleAllTodos,
  } = useTodos();

  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredTodos = todos.filter(todo => {
    if (filter === TodoFilter.Active) {
      return !todo.completed;
    }

    if (filter === TodoFilter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const handleEditStart = (id: number) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          addTodo={addTodo}
          toggleAllTodos={toggleAllTodos}
          todosLength={todos.length}
          activeTodosCount={activeTodosCount}
        />
        <TodoList
          todos={filteredTodos}
          editingId={editingId}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          updateTodoTitle={updateTodoTitle}
          handleEditStart={handleEditStart}
          cancelEditing={cancelEditing}
        />
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
            activeTodosCount={activeTodosCount}
          />
        )}
      </div>
    </div>
  );
};
//new
