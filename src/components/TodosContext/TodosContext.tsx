import React from 'react';
import { ProviderProps } from '../../types/ProviderProps';
import { Todo } from '../../types/Todo';
import { Context } from '../../types/Context';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const TodosContext = React.createContext<Context>({
  todos: [],
  setTodos: () => { },
  addTodoHandler: () => { },
  updateTodoTitleHandler: () => { },
  deleteTodoHandler: () => { },
});

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodoHandler = (newTodo: Todo) => {
    const newTodos: Todo[] = [...todos, newTodo];

    setTodos(newTodos);
    // setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const updateTodoTitleHandler = (updatedTodo: Todo) => {
    const updatedTodos = todos
      .map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));

    setTodos(updatedTodos);
    // setTodos(prevTodos => prevTodos
    //   .map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const deleteTodoHandler = (todoId: number) => {
    const todosAfterDeleting = todos.filter(todo => todo.id !== todoId);

    setTodos(todosAfterDeleting);
    // setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  const value = {
    todos,
    setTodos,
    addTodoHandler,
    updateTodoTitleHandler,
    deleteTodoHandler,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
