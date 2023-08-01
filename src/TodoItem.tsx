/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodosList: React.FC = () => {
  return (
    <li>
      <div className="view">
        <input type="checkbox" className="toggle" id="toggle-view" />
        <label htmlFor="toggle-view">asdfghj</label>
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
