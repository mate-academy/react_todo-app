import {
  HandleCompletedChange,
  HandleTitleChange,
  HandleTodoAdd,
  HandleTodoRemove,
} from './handlers';

export type TodoApiContextValue = {
  handleTodoAdd: HandleTodoAdd;
  handleTodoRemove: HandleTodoRemove;
  handleCompletedChange: HandleCompletedChange;
  handleTitleChange: HandleTitleChange;
};
