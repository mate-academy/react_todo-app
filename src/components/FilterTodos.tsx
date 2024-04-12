import { Status, OrderItems } from '../types/Type';

export function FilterTodos(
  orderItems: OrderItems[],
  status: Status,
): OrderItems[] {
  switch (status) {
    case Status.Active:
      return orderItems.filter(todo => !todo.completed);
    case Status.Completed:
      return orderItems.filter(todo => todo.completed);
    default:
      return orderItems;
  }
}
