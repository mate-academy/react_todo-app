import { FC, useEffect, useState } from 'react';

import { TodoHeader } from '../Header/TodoHeader';
import { TodoMain } from '../Main/TodoMain';
import { TodoFooter } from '../Footer/TodoFooter';

import { Todo } from '../../types/types';

export const TodoContent: FC = () => {
  // #region State
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem('todos');

    return localValue ? JSON.parse(localValue) : [];
  });

  const [filteredTodos, setFilteredTodos] = useState(todos);

  // #endregion

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    setFilteredTodos(todos);
  }, [todos]);

  // #region constant
  const allCompleted = todos.every(todo => todo.completed);
  const numberNotComplete = todos.filter(todo => !todo.completed).length;
  const numberComplete = todos.filter(todo => todo.completed).length;
  const numberTotal = todos.length;
  // #endregion

  // #region Handle
  const addTodo = (newTodo: string) => {
    if (newTodo.trim() !== '') {
      setTodos(currentTodos => [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newTodo, completed: false },
      ]);
    }
  };

  const toggleTodo = (id: string, completed: boolean) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  };

  const toggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  };

  const deleteCompletedTodos = () => {
    const deleteTodos = [...todos].filter(todo => !todo.completed);

    setTodos(deleteTodos);
  };

  const editTask = (id: string, newName: string) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newName };
        }

        return todo;
      });
    });
  };

  const getAllTodos = () => {
    const filteredAllTodos = [...todos].filter(todo => todo);

    setFilteredTodos(filteredAllTodos);
  };

  const getActiveTodos = () => {
    const filteredTodosActive = [...todos].filter(todo => !todo.completed);

    setFilteredTodos(filteredTodosActive);
  };

  const getCompletedTodos = () => {
    const filteredTodosCompleted = [...todos].filter(todo => todo.completed);

    setFilteredTodos(filteredTodosCompleted);
  };

  // #endregion

  return (
    <div className="todoapp__content">
      <TodoHeader
        todos={todos}
        allCompleted={allCompleted}
        addTodo={addTodo}
        toggleAll={toggleAll}
      />
      {todos.length > 0 && (
        <>
          <TodoMain
            todos={filteredTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTask={editTask}
          />

          <TodoFooter
            numberNotComplete={numberNotComplete}
            numberComplete={numberComplete}
            numberTotal={numberTotal}
            deleteCompletedTodos={deleteCompletedTodos}
            getAllTodos={getAllTodos}
            getActiveTodos={getActiveTodos}
            getCompletedTodos={getCompletedTodos}
          />
        </>
      )}
    </div>
  );
};
