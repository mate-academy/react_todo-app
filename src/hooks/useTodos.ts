import { useLayoutEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import {
  getInCompletedTodos,
  hasInCompletedTodos,
} from '../utils/todos/getTodos';
import { validUpdatedTodos } from '../utils/todos/validationTodo';
import { updateTodosCompleted } from '../utils/todos/updateTodo';
import { getRandomId } from '../utils/getRandomId';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = () => {
    const localTodos = localStorage.getItem('todos');

    setTodos(localTodos ? JSON.parse(localTodos) : []);
  };

  const addTodo = (title: string): Todo | void => {
    const todo = {
      title,
      completed: false,
      id: getRandomId(),
    };

    localStorage.setItem('todos', JSON.stringify([...todos, todo]));

    setTodos(prevState => [...prevState, todo]);
  };

  const deleteTodo = (todoId: string) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(newTodos);

    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const deleteCompletedTodos = async () => {
    const inCompletedTodos = getInCompletedTodos(todos);

    setTodos(inCompletedTodos);

    localStorage.setItem('todos', JSON.stringify(inCompletedTodos));
  };

  const updateTodo = (todo: Todo): Todo | void => {
    const updatedTodos = todos.map(currentTodo =>
      currentTodo.id === todo.id ? todo : currentTodo,
    );

    setTodos(updatedTodos);

    return todo;
  };

  const updatedAllTodo = (): void => {
    const isIncompletedTodo = hasInCompletedTodos(todos);

    const newTodos = isIncompletedTodo
      ? updateTodosCompleted(getInCompletedTodos(todos))
      : updateTodosCompleted(todos);

    const res = newTodos.map(todo => updateTodo(todo));

    const updatedTodos = validUpdatedTodos(res);

    if (!!updatedTodos.length) {
      setTodos(prevState => {
        const updatedState = prevState.map(todo => {
          const updatedTodo = updatedTodos.find(
            updated => updated.id === todo.id,
          );

          return updatedTodo ? updatedTodo : todo;
        });

        return updatedState;
      });
    }
  };

  useLayoutEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    fetchTodos,
    addTodo,
    deleteTodo,
    deleteCompletedTodos,
    updateTodo,
    updatedAllTodo,
  };
};
