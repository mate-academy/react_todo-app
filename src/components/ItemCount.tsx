type Props = {
  todosLength: number;
  amountCompletedTodos: number;
};

export const ItemCount: React.FC<Props> = (
  {
    todosLength,
    amountCompletedTodos,
  },
) => {
  return (
    <span>
      {`${todosLength - amountCompletedTodos} items left`}
    </span>
  );
};
