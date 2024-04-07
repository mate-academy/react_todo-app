import { Todo } from '../types/Todo';
import { Action } from '../enums/Action';
import { ActionType } from '../types/ActionType';
import { getTodosFromLocalStorage } from './getTodosFromLocalStorage';
import { isHaveNotCompletedTodo } from './isHaveNotCompletedTodo';
import { Todos } from '../types/Todos';

export const reducer = (todos: Todos, action: ActionType) => {
  const removeTodo = (index: number) => {
    const newTodosWithRemoved = [
      ...todos.visibleTodos.slice(0, index),
      ...todos.visibleTodos.slice(index + 1),
    ];

    localStorage.setItem('todos', JSON.stringify(newTodosWithRemoved));

    return {
      ...todos,
      visibleTodos: newTodosWithRemoved,
    };
  };

  switch (action.type) {
    case Action.addNewTodo:
      if (!todos.newInputName) {
        return { ...todos };
      }

      const newTodo = {
        name: todos.newInputName,
        id: new Date().getTime(),
        isCompleted: false,
      };
      const newTodosWithAdded = [...todos.visibleTodos, newTodo];

      localStorage.setItem(
        'todos',
        JSON.stringify([...getTodosFromLocalStorage(), newTodo]),
      );

      return {
        newInputName: '',
        visibleTodos: newTodosWithAdded,
      };

    case Action.updateNewTodoName:
      return {
        ...todos,
        newInputName: action.newInputName,
      };

    case Action.changeIsCompleted:
      const changedTodo = {
        ...todos.visibleTodos[action.index],
        isCompleted: !todos.visibleTodos[action.index].isCompleted,
      };

      const newTodos = [
        ...todos.visibleTodos.slice(0, action.index),
        changedTodo,
        ...todos.visibleTodos.slice(action.index + 1),
      ];

      localStorage.setItem('todos', JSON.stringify(newTodos));

      return {
        ...todos,
        visibleTodos: newTodos,
      };

    case Action.removeTodo:
      return removeTodo(action.index);

    case Action.editName:
      if (!action.newName) {
        return removeTodo(action.index);
      }

      const newEditedTodos = [...todos.visibleTodos];

      newEditedTodos[action.index].name = action.newName;

      localStorage.setItem('todos', JSON.stringify(newEditedTodos));

      return {
        ...todos,
        visibleTodos: newEditedTodos,
      };
    case Action.toggleCompleted:
      if (isHaveNotCompletedTodo(todos.visibleTodos)) {
        const changedTodos = todos.visibleTodos.map(todo => ({
          ...todo,
          isCompleted: true,
        }));

        localStorage.setItem('todos', JSON.stringify(changedTodos));

        return {
          ...todos,
          visibleTodos: changedTodos,
        };
      } else {
        const changedTodos = todos.visibleTodos.map(todo => ({
          ...todo,
          isCompleted: false,
        }));

        return {
          ...todos,
          visibleTodos: changedTodos,
        };
      }

    case Action.clearAllCompleted:
      localStorage.setItem(
        'todos',
        JSON.stringify(
          getTodosFromLocalStorage().filter((todo: Todo) => !todo.isCompleted),
        ),
      );

      return {
        ...todos,
        visibleTodos: todos.visibleTodos.filter(todo => !todo.isCompleted),
      };
  }
};
