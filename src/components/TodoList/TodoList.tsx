import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

export const TodoList = () => {
  return (
    <ul className="todo-list" data-cy="todoList">
      <li>
        <div className="view">
          <Input
            type="checkbox"
            className="toggle"
            id="toggle-completed"
            name="name"
          />
          <label htmlFor="toggle-view">asdfghj</label>
          <Button />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <Button />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <Button />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <Button />
        </div>
        <input type="text" className="edit" />
      </li>
    </ul>
  );
};
