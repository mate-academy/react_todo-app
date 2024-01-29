import React, { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

interface TodoContext {
  todos: Todo[],
  addTodo: (todo: Todo, event: React.FormEvent<HTMLFormElement>) => void,
  setCompleted: (todoID: number) => void,
  setAllCompletedOrRemoveCompleted: (todos: Todo[]) => void,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  filteredTodosForList: Todo[],
  deleteCompletedTodos: () => void,
  deleteTodo: (id: number) => void,
  saveEditingTitle: (todoId: number, todoNewTitle: string) => void,
}

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  addTodo: () => { },
  setCompleted: () => { },
  setAllCompletedOrRemoveCompleted: () => { },
  query: '',
  setQuery: () => { },
  filteredTodosForList: [],
  deleteCompletedTodos: () => { },
  deleteTodo: () => { },
  saveEditingTitle: () => { },
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [query, setQuery] = useState('');

  function addTodo(todo: Todo, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (todo.title.trim().length) {
      setTodos(prevTodos => [
        ...prevTodos,
        todo,
      ]);
    }
  }

  function setCompleted(todoID: number) {
    const changeCompletedTodos = todos.map(todo => {
      return todo.id === todoID
        ? { ...todo, completed: !todo.completed }
        : todo;
    });

    setTodos(changeCompletedTodos);
  }

  function chooseFilterForTodos(queryForFilter: string) {
    return todos.filter(todo => {
      switch (queryForFilter) {
        case Status.Active:
          return todo.completed === false;

        case Status.Completed:
          return todo.completed === true;

        default:
          return true;
      }
    });
  }

  const filteredTodosForList = chooseFilterForTodos(query);

  function saveEditingTitle(todoID: number, changedTitle: string) {
    let changedTodos = [...todos];

    if (changedTitle.trim()) {
      changedTodos = changedTodos.map(todo => (
        todo.id === todoID
          ? { ...todo, title: changedTitle }
          : todo));
    }

    setTodos(changedTodos);
  }

  function setAllCompletedOrRemoveCompleted(todosToComplete: Todo[]) {
    const checkForAllTodosCompleted = todosToComplete.every(
      todo => todo.completed === true,
    );

    let todosPrepare = [...todos];

    todosPrepare = todosPrepare.map(
      todo => (
        { ...todo, completed: !checkForAllTodosCompleted }
      ),
    );

    setTodos(todosPrepare);
  }

  function deleteTodo(todoID: number) {
    setTodos(todos.filter(todo => todo.id !== todoID));
  }

  function deleteCompletedTodos() {
    setTodos(todos.filter(todo => todo.completed === false));
  }

  const value = useMemo(() => ({
    todos,
    addTodo,
    setCompleted,
    setAllCompletedOrRemoveCompleted,
    query,
    setQuery,
    filteredTodosForList,
    deleteCompletedTodos,
    deleteTodo,
    saveEditingTitle,
  }), [todos, filteredTodosForList, query]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
