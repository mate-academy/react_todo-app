interface TodosCounterProps {
  todosCount: number;
}

export const TodosCounter: React.FC<TodosCounterProps> = ({ todosCount }) => {
  return (
    <span className="todo-count" data-cy="TodosCounter">
      {todosCount} items left
    </span>
  );
};
