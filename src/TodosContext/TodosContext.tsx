import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

type TodosContexProps = {
  todos: Todo[],
  todosCount: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filterBy: Status,
  setFilterBy: React.Dispatch<React.SetStateAction<Status>>,
  addTodo: (newTodo: Todo) => void,
  editTodo: (id: number, editValue: string) => void,
  deleteTodo: (id: number) => void,
  setAllAsComplete: (completeAll: boolean) => void,
  deleteCompletedTodos: () => void,
};

export const TodosContext = React.createContext<TodosContexProps>({
  todos: [],
  todosCount: 0,
  setTodos: () => { },
  filterBy: Status.All,
  setFilterBy: () => { },
  addTodo: () => { },
  editTodo: () => { },
  deleteTodo: () => { },
  setAllAsComplete: () => { },
  deleteCompletedTodos: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterBy, setFilterBy] = useState(Status.All);

  const todosCount = todos.length;

  const addTodo = (newTodo: Todo) => {
    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const editTodo = (id: number, editValue: string) => {
    setTodos((currentTodos) => {
      return (
        currentTodos.map(el => {
          if (el.id === id) {
            return {
              ...el,
              title: editValue,
            };
          }

          return el;
        })
      );
    });
  };

  const deleteTodo = (id: number) => {
    setTodos((currentTodos) => {
      return currentTodos.filter(el => el.id !== id);
    });
  };

  const setAllAsComplete = (completeAll: boolean) => {
    setTodos((currentTodos) => (
      currentTodos.map((el) => {
        return {
          ...el,
          completed: completeAll,
        };
      })
    ));
  };

  const deleteCompletedTodos = () => {
    setTodos((currentTodos) => (
      currentTodos.filter(el => !el.completed)
    ));
  };

  const value = useMemo(() => ({
    todos,
    todosCount,
    setTodos,
    filterBy,
    setFilterBy,
    addTodo,
    editTodo,
    deleteTodo,
    setAllAsComplete,
    deleteCompletedTodos,
  }), [todos,
    todosCount,
    filterBy,
    // setTodos,
    // addTodo,
    // editTodo,
    // deleteTodo,
    // setAllAsComplete,
    // deleteCompletedTodos,
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
