import React, { useCallback, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { getFilteredTodos } from '../services/getFilteredTodos';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TodoContextType } from '../types/TodoContext';
import { TodoFilterContextType } from '../types/TodoFilter';
import { TodoUpdateContextType } from '../types/TodoUpdateContext';

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  filteredTodos: [],
});

export const FilterContext = React.createContext<TodoFilterContextType>({
  status: Status.All,
  changeStatus: () => { },
});

export const TodoUpdateContext = React.createContext<TodoUpdateContextType>({
  addTodo: () => { },
  completeAll: () => { },
  deleteCompleted: () => { },
  deleteTodo: () => { },
  updateTodo: () => { },
});

interface Props {
  children: React.ReactNode
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState<Status>(Status.All);

  const filteredTodos = getFilteredTodos(todos, status);

  const addTodo = useCallback((newTodo: Todo) => {
    if (!newTodo.title) {
      return;
    }

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, [setTodos]);

  const completeAll = useCallback(() => {
    setTodos(prevTodos => prevTodos.map(todo => {
      const isCompleteAll = prevTodos.some(({ completed }) => !completed);

      return { ...todo, completed: isCompleteAll };
    }));
  }, [setTodos]);

  const deleteCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(({ completed }) => !completed));
  }, [setTodos]);

  const deleteTodo = useCallback((todoToDelete: Todo) => {
    setTodos(prevTodos => prevTodos
      .filter(curTodo => curTodo.id !== todoToDelete.id));
  }, [setTodos]);

  const updateTodo = useCallback((updTodo: Todo) => {
    setTodos(prevTodos => prevTodos.map(prevTodo => {
      if (updTodo.id !== prevTodo.id) {
        return prevTodo;
      }

      return updTodo;
    }));
  }, [setTodos]);

  const changeStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const todoMethods = useMemo(() => ({
    addTodo,
    completeAll,
    deleteCompleted,
    deleteTodo,
    updateTodo,
  }), [addTodo, completeAll, deleteCompleted, deleteTodo, updateTodo]);

  const todosValue = useMemo(() => ({
    todos,
    filteredTodos,
  }), [todos, filteredTodos]);

  const filterValue = useMemo(() => ({
    status,
    changeStatus,
  }), [status]);

  return (
    <FilterContext.Provider value={filterValue}>
      <TodoUpdateContext.Provider value={todoMethods}>
        <TodoContext.Provider value={todosValue}>
          {children}
        </TodoContext.Provider>
      </TodoUpdateContext.Provider>
    </FilterContext.Provider>

  );
};
