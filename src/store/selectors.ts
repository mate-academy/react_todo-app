export const getTodosSelector = (state: State) => state.todos;
export const getVisibleTodosSelector = (state: State) => state.visibleTodos;
export const getCompletedTodosSelector = (state: State) => state.completedTodos;
export const getNewTodoSelector = (state: State) => state.newTodo;
export const getActiveFilterSelector = (state: State) => state.activeFilter;
export const getEditingIdSelector = (state: State) => state.editingId;
export const getInitialTitleSelector = (state: State) => state.initialTitle;
