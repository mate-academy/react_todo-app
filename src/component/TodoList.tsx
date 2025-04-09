import { TodoItems } from './TodoItems';
export const TodoList = ({ todos, onDelete }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => {
        return <TodoItems onDelete={onDelete} todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
