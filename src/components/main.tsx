/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  data:Todo[];
  setData:any;
};

export const Main: React.FC <Props> = ({ data, setData }) => {
  const [checked, setChecked] = useState(false);

  const handleRemove = (id:number) => {
    const newList = data.filter((item) => item.id !== id);

    setData(newList);
  };

  // const handleCheck = (id:number) => {
  //   const newList = data.filter((todo) => todo.id === id);
  //     console.log(newList)

  //   setChecked(!checked);
  // };

  const handleCheck = () => {
    setChecked(!checked);
    console.log('clicked')
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {data.map(todo => (
          <li>
            <div className="view" key={todo.id}>
              <input
                type="checkbox"
                // name='checkbox {todo.id}'
                // value={checked.{todo.id}}
                // className={`${!checked ? 'toggle' : 'toggle completed'}`}
                // className={`${!checked ? 'toggle' : 'toggle completed'}`}
                className={classNames('toggle',
                  { completed: checked })}
                // onClick={() => {setChecked(!isChecked)}}
                id="toggle-view"
                // onChange={() => handleCheck(todo.id)}
                onChange={handleCheck}
                // checked={checked}
              />
              <label htmlFor="toggle-view">{todo.title}</label>
              <button
                type="button"
                className="destroy"
                data-cy="deleteTodo"
                onClick={() => handleRemove(todo.id)}
              />
            </div>
            <input type="text" className="edit" />
          </li>

        ))}
      </ul>
    </section>
  );
};

/*
<li className="completed">
  <div className="view">
    <input type="checkbox" className="toggle" id="toggle-completed" />
    <label htmlFor="toggle-completed">qwertyuio</label>
    <button type="button" className="destroy" data-cy="deleteTodo" />
  </div>
  <input type="text" className="edit" />
</li>

<li className="editing">
  <div className="view">
    <input type="checkbox" className="toggle" id="toggle-editing" />
    <label htmlFor="toggle-editing">zxcvbnm</label>
    <button type="button" className="destroy" data-cy="deleteTodo" />
  </div>
  <input type="text" className="edit" />
</li>

<li>
  <div className="view">
    <input type="checkbox" className="toggle" id="toggle-view2" />
    <label htmlFor="toggle-view2">1234567890</label>
    <button type="button" className="destroy" data-cy="deleteTodo" />
  </div>
  <input type="text" className="edit" />
</li> */
