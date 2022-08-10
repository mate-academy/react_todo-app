import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

export const useLocalStorage = (listOfTodos: Todo[]) => {
  const [todosList, setTodosList] = useState<Todo[]>([]);

  useEffect(() => {
    const todosFromStorage = localStorage.getItem('list_of_Todos');

    let data: Todo[] = [];

    if (todosFromStorage) {
      data = JSON.parse(todosFromStorage);
      setTodosList(data);
    }
  }, []);

  useEffect(() => {
    if (listOfTodos.length > 0) {
      localStorage.setItem('list_of_Todos', JSON.stringify(listOfTodos));
    }
  }, [listOfTodos]);

  return todosList;
};
