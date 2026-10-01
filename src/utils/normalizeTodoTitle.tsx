export function normalizeTodoTitle(title: string) {
  const trimmedTodoTitle = title.trim();

  if (trimmedTodoTitle === '') {
    return '';
  }

  return trimmedTodoTitle
    .split('')
    .filter((char, index, updatedTodo) => {
      if (index === 0) {
        return true;
      }

      if (char === ' ' && updatedTodo[index - 1] === ' ') {
        return false;
      }

      return true;
    })
    .join('');
}
