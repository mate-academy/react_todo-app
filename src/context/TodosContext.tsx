import { createContext, Dispatch, SetStateAction, useEffect } from 'react';
import { FC, ReactNode, useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../helpers/getTodos';
import { FilterTypes } from '../enums/FilterTypes';
import { getFilteredList } from '../helpers/getFilteredList';
import { deleteTodo } from '../helpers/deleteTodo';

interface ContextProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filteredTodoList: Todo[];
  setFilter: (filterTypes: FilterTypes) => void;
  handleDelete: (id: number) => void;
  completedTodos: Todo[];
}

const TodosContext = createContext<ContextProps | undefined>(undefined);

const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterTypes>(FilterTypes.All);

  const completedTodos = todos.filter(todo => todo.completed);
  const filteredTodoList = getFilteredList(todos, filter);
  const handleDelete = (id: number) => deleteTodo({ id, setTodos });

  useEffect(() => {
    getTodos({ setTodos });
  }, []);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const contextValue = {
    todos,
    setTodos,
    filteredTodoList,
    setFilter,
    handleDelete,
    completedTodos,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodosContext must be used within a TodoProvider');
  }

  return context;
};

export { TodosProvider, useTodosContext };
