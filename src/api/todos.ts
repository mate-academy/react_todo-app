export const addTodoApi = async (todoText: string) => {
  return { id: Date.now(), text: todoText, completed: false };
};
