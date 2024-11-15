import { useLayoutEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import {
  getCompletedTodos,
  getInCompletedTodos,
  hasInCompletedTodos,
} from '../utils/todos/getTodos';
import { updateTodosCompleted } from '../utils/todos/updateTodo';
import { getRandomId } from '../utils/getRandomId';
import useLocaLStorage from './useLocaLStorage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { getItem, setItem } = useLocaLStorage('todos');

  const fetchTodos = () => {
    const localTodos = <Todo[]>getItem();

    setTodos(localTodos ? localTodos : []);
  };
  const addTodo = (title: string): Todo | void => {
    const todo = {
      title,
      completed: false,
      id: getRandomId(),
    };

    setItem([...todos, todo]);

    setTodos(prevState => [...prevState, todo]);
  };

  const deleteTodo = (todoId: string) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(newTodos);

    setItem(newTodos);
  };

  const deleteCompletedTodos = async () => {
    const inCompletedTodos = getInCompletedTodos(todos);

    setTodos(inCompletedTodos);

    setItem(inCompletedTodos);
  };

  const updateTodo = (todo: Todo): Todo | void => {
    const updatedTodos = todos.map(currentTodo =>
      currentTodo.id === todo.id ? todo : currentTodo,
    );

    setTodos(updatedTodos);

    setItem(updatedTodos);

    return todo;
  };

  const updatedAllTodo = (): void => {
    const isIncompletedTodo = hasInCompletedTodos(todos);

    let newTodos: Todo[] = [];

    if (isIncompletedTodo) {
      newTodos = [
        ...updateTodosCompleted(getInCompletedTodos(todos)),
        ...getCompletedTodos(todos),
      ];
    } else {
      newTodos = updateTodosCompleted(todos);
    }

    setTodos(newTodos);

    setItem(newTodos);
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
