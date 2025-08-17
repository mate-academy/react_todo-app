import { useContext, useRef } from 'react';
import { Todo } from '../Type/Todo';
import { Edit } from '../Enum/Edit';
import { TodoListContext } from '../Context/TodoListContext';

export const useEdit = (todos: Todo[]) => {
  const editedTodoList = useRef<Todo[]>(todos);
  const { todoList, setTodoList } = useContext(TodoListContext);

  const getStatus = (list: Todo[]) => {
    if (list.every(todoItem => todoItem.completed)) {
      return false;
    } else if (list.every(todoItem => !todoItem.completed)) {
      return true;
    } else {
      return true;
    }
  };

  const getlistAfterDel = (todo: Todo) => {
    return todoList.filter(todoItem => todoItem.id !== todo.id);
  };

  const getChangedStatusList = (list: Todo[]) => {
    const status = getStatus(todos);

    return list.map((todoElement: Todo) => ({
      ...todoElement,
      completed: status,
    }));
  };

  const getDeleteCompletedList = (list: Todo[]) => {
    return list.filter(todoItem => !todoItem.completed);
  };

  const getEditTitle = (
    editType: keyof typeof Edit,
    todo: Todo,
    editedTitle: string | '',
  ) => {
    let newTargetTodo: Todo = { ...todo };
    const targetIndex = todoList.findIndex(todoItem => todoItem.id === todo.id);

    if (editType === Edit.title) {
      if (editedTitle.length === 0) {
        return getlistAfterDel(todo);
      } else {
        newTargetTodo = { ...todo, title: editedTitle };
      }
    }

    if (editType === Edit.completed) {
      newTargetTodo = { ...todo, completed: !todo.completed };
    }

    return todoList.toSpliced(targetIndex, 1, newTargetTodo);
  };

  const getEditedTodoList = ({
    todosForChange = todos,
    editType,
    editedTitle,
  }: {
    todosForChange?: Todo[];
    editType: keyof typeof Edit;
    editedTitle?: string;
  }) => {
    let todo: Todo | null;
    let newTodoList: Todo[] | [] = [];

    if (todosForChange.length === 1) {
      todo = todosForChange[0];
    } else {
      todo = null;
    }

    if (
      (editType === Edit.title || editType === Edit.completed) &&
      todo !== null
    ) {
      newTodoList = getEditTitle(editType, todo, editedTitle ?? '');
    } else if (editType === Edit.delete && todo) {
      newTodoList = getlistAfterDel(todo);
    } else if (editType === Edit.deleteCompleted) {
      newTodoList = getDeleteCompletedList(todos);
    } else {
      newTodoList = getChangedStatusList(todos);
    }

    if (editedTodoList.current && newTodoList) {
      editedTodoList.current = newTodoList;
      setTodoList(newTodoList);
    }
  };

  return getEditedTodoList;
};
