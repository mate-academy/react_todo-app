export const TodoItem = () => {
  // { id, title, completed } = todo;

  return (
    <div>
      <li>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
          />
          <label htmlFor="toggle-view">asdfghj</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="asdfghj"
          />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="completed">
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-completed"
          />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="qwertyuio"
          />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="zxcvbnm"
          />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="1234567890"
          />
        </div>
        <input type="text" className="edit" />
      </li>
    </div>
  );
};
