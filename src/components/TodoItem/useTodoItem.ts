import { ChangeEvent, useState } from 'react';
import { useDispatch } from '../../store';
import { DELETE_TODO, UPDATE_TODO } from '../../utils/actionTypes';
import { TodoModel } from '../../types/Todo.model';

interface Props {
  todo: TodoModel;
}

export const useTodoItem = ({ todo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const onCompletedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target as HTMLInputElement;

    dispatch({
      type: UPDATE_TODO,
      payload: { id: todo.id, completed: checked },
    });
  };

  const onDelete = () => {
    dispatch({ type: DELETE_TODO, payload: { id: todo.id } });
  };

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCompleteEdit = () => {
    setIsEdit(false);
  };

  return {
    isEdit,
    onCompletedChange,
    onDelete,
    onEdit,
    onCompleteEdit,
  };
};
