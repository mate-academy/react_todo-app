export const Todo = ({ todo }) => {
  return (
    <>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label htmlFor="co">
          {todo.title}
        </label>
        <button type="button" className="destroy">d</button>
      </div>
      <input type="text" className="edit" />
    </>
  );
};
