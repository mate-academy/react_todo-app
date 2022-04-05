export const SET_TODOS = 'SET_TODOS';
export const SET_VISIBLE_TODOS = 'SET_VISIBLE_TODOS';
export const SET_COMPLETED_TODOS = 'SET_COMPLETED_TODOS';
export const SET_NEW_TODO = 'SET_NEW_TODO';
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';
export const SET_EDITING_ID = 'SET_EDITING_ID';
export const SET_INITIAL_TITLE = 'SET_INITIAL_TITLE';

export const setTodosAction = (payload: Todo[]) => ({
  type: SET_TODOS,
  payload,
});

export const setVisibleTodosAction = (payload: Todo[]) => ({
  type: SET_VISIBLE_TODOS,
  payload,
});

export const setCompletedTodosAction = (payload: number[]) => ({
  type: SET_COMPLETED_TODOS,
  payload,
});

export const setNewTodoAction = (payload: string) => ({
  type: SET_NEW_TODO,
  payload,
});

export const setActiveFilterAction = (payload: string) => ({
  type: SET_ACTIVE_FILTER,
  payload,
});

export const setEditingIdAction = (payload: number) => ({
  type: SET_EDITING_ID,
  payload,
});

export const setInitialTitleAction = (payload: string[]) => ({
  type: SET_INITIAL_TITLE,
  payload,
});
