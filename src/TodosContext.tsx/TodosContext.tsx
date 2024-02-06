import React, { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { TodosContext } from '../variables/TodosContext.1';
import { Props } from '../types/Props';
import { chooseFilterForTodos } from '../services/chooseFilterForTodos';

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

  const filteredTodosForList = chooseFilterForTodos(query, todos);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [todos, filteredTodosForList, query]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
