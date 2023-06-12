/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo } from 'react';
import { TodosFilter } from './TodosFilter';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Status } from './types/Status';
import { useLocalStorage } from './helpers/useLocaleStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoStatus, setTodoStatus] = useState<Status>(Status.All);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim() !== '') {
      const newTodo = {
        id: +new Date().getTime(),
        title: todoTitle,
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTodoTitle('');
    }
  };

  const deleteTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  const clearCompletedTodos = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const changeTodoTitle = (todoId: number, newTodoTitle: string) => {
    setTodos(prevTodos => prevTodos.map(todo => (
      todo.id === todoId
        ? { ...todo, title: newTodoTitle }
        : todo
    )));
  };

  const toggleCompleteTodos = (todoId: number, completed: boolean) => {
    setTodos(prevTodos => prevTodos.map(todo => (
      todo.id === todoId
        ? { ...todo, completed: !completed }
        : todo
    )));
  };

  const filteredTodos = useMemo(() => {
    switch (todoStatus) {
      case (Status.Active):
        return todos.filter(todo => !todo.completed);

      case (Status.Completed):
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, todoStatus]);

  const isAllCompleted = todos.every(todo => todo.completed);

  const toggleAllCopleteTodos = () => {
    setTodos(prevTodos => prevTodos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    })));
  };

  return (
    <div className="todoapp">

      <Header
        addTodo={addTodo}
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
      />

      {todos.length > 0 && (
        <>
          <TodoList
            todos={filteredTodos}
            deleteTodo={deleteTodo}
            toggleCompleteTodos={toggleCompleteTodos}
            changeTodoTitle={changeTodoTitle}
            toggleAllCompleteTodos={toggleAllCopleteTodos}
            isAllCompleted={isAllCompleted}

          />

          <TodosFilter
            todos={todos}
            todoStatus={todoStatus}
            setTodoStatus={setTodoStatus}
            clearCompletedTodos={clearCompletedTodos}
          />
        </>
      )}

    </div>
  );
};
