/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useRef } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToDoItem } from './components/ToDoItem';

export const App: React.FC = () => {
  const [todos, setToDos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredToDos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const addToDo = (newTodo: Todo) => {
    const createdTodo = {
      id: +new Date(),
      title: newTodo.title,
      completed: newTodo.completed,
      userId: 1,
    };

    setToDos(currentTodos => [...currentTodos, createdTodo]);
  };

  const deleteToDo = (todoId: number) => {
    setToDos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const deleteCompletedToDos = () => {
    setToDos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const updateTodo = (todoId: number, updatedFields: Partial<Todo>) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);

    if (!todoToUpdate) {
      return;
    }

    const isUnchanged = Object.entries(updatedFields).every(
      ([key, value]) => todoToUpdate[key as keyof Todo] === value,
    );

    if (isUnchanged) {
      return;
    }

    const updatedTodo = {
      ...todoToUpdate,
      ...updatedFields,
    };

    setToDos(currentTodos =>
      currentTodos.map(todo => (todo.id === todoId ? updatedTodo : todo)),
    );
  };

  const allCompleted = todos.every(todo => todo.completed);

  const toggleAllTodos = () => {
    const newStatus = !allCompleted;

    setToDos(currentTodos =>
      currentTodos.map(todo => ({
        ...todo,
        completed: newStatus,
      })),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          toggleAll={toggleAllTodos}
          addToDo={addToDo}
          inputRef={inputRef}
          todos={todos}
        />

        <section className="todoapp__main" data-cy="TodoList">
          {filteredToDos.map(todo => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              deleteToDo={deleteToDo}
              updateTodo={updateTodo}
              isEditing={editingTodoId === todo.id}
              setIsEditing={isEditing =>
                setEditingTodoId(isEditing ? todo.id : null)
              }
            />
          ))}
        </section>

        <Footer
          todos={todos}
          setFilter={setFilter}
          deleteCompletedToDos={deleteCompletedToDos}
          filter={filter}
        />
      </div>
    </div>
  );
};
