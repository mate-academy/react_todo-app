import React, {useContext, useEffect, useState, useRef} from 'react';
import classNames from 'classnames';
import { TodoContext } from './TodoContext';

export const TodoItem = ({todo}) => {
  let {visibleTodos, todos, setTodo} = useContext(TodoContext);
  const [isEditable, setIsEditable] = useState(false);
  const [changedValue, setChangedValue] = useState(todo.title);

  const useMountEffect = (fun) => useEffect(fun, [isEditable]);

  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

      return [ htmlElRef, setFocus ]
  };

  const [inputRef, setInputFocus] = useFocus();

  useMountEffect( setInputFocus );

  return (
    <li
      key={todo.id}
      className={classNames({
        'completed': todo.completed,
        'editing': isEditable
      })}
      onDoubleClick={() => {setIsEditable(true)}}
    >
      <div

       className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            setTodo(todos.map(todoThis => todoThis.id === todo.id
              ? {
                  ...todoThis,
                  completed: !todoThis.completed
                }
              : todoThis
            ))
          }}
        />
        <label>{todo.title}</label>
        <button type="button" className="destroy" onClick={() => {
          setTodo(todos.filter(todoThis => todoThis.id !== todo.id))
        }}/>
      </div>
      <input
        type="text"
        className="edit"
        onChange={(event) => setChangedValue(event.target.value)}
        value={changedValue}
        autoFocus={true}
        ref={inputRef}
        // ref={ function(component){ React.findDOMNode(component).focus();} }
        onBlur={() => {
          if (changedValue !== '') {
              setTodo(todos.map(todoThis => todoThis.id === todo.id
                ? {
                    ...todoThis,
                    title: changedValue
                  }
                : todoThis
              ));
              setIsEditable(false);
            } else {
              setTodo(todos.filter(todoThis => todoThis.id !== todo.id));
              setIsEditable(false);
            }
          setIsEditable(false)
        }}
        onKeyDown={(event) =>{
          if (event.key === 'Enter') {
            if (changedValue !== '') {
              setTodo(todos.map(todoThis => todoThis.id === todo.id
                ? {
                    ...todoThis,
                    title: changedValue
                  }
                : todoThis
              ));
              setIsEditable(false);
            } else {
              setTodo(todos.filter(todoThis => todoThis.id !== todo.id));
              setIsEditable(false);
            }
          }

          if (event.key === 'Escape') {
            setChangedValue(todo.title);
            setIsEditable(false);
          }
        }}
      />
    </li>
  );
};


// this.textInput = React.createRef();
//     this.focusTextInput = this.focusTextInput.bind(this);
//   }

  // focusTextInput() {
  //   // Explicitly focus the text input using the raw DOM API
  //   // Note: we're accessing "current" to get the DOM node
  //   this.textInput.current.focus();
  // }

  // render() {
  //   // tell React that we want to associate the <input> ref
  //   // with the `textInput` that we created in the constructor
  //   return (
  //     <div>
  //       <input
  //         type="text"
  //         ref={this.textInput} />
  //       <input
  //         type="button"
  //         value="Focus the text input"
  //         onClick={this.focusTextInput}
