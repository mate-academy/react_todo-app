import React, { useRef, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToDoItem } from './ToDoItem';
import { useTodoContext } from '../context/TodoContext';

export const TodoApp: React.FC = () => {
  const {
    todos,
    filter,
    addTodo,
    deleteTodo,
    updateTodo,
    deleteCompletedTodos,
    toggleAllTodos,
    setFilter,
  } = useTodoContext();

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredToDos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          toggleAll={toggleAllTodos}
          addToDo={addTodo}
          inputRef={inputRef}
          todos={todos}
        />

        <section className="todoapp__main" data-cy="TodoList">
          {filteredToDos.map(todo => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              deleteToDo={deleteTodo}
              updateTodo={updateTodo}
              isEditing={editingTodoId === todo.id}
              setIsEditing={isEditing =>
                setEditingTodoId(isEditing ? todo.id : null)
              }
              mainInputRef={inputRef}
            />
          ))}
        </section>

        <Footer
          todos={todos}
          setFilter={setFilter}
          deleteCompletedToDos={deleteCompletedTodos}
          filter={filter}
          mainInputRef={inputRef}
        />
      </div>
    </div>
  );
};
