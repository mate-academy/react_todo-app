import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

class TodoList extends React.Component {
  state = {
    todos: this.props.todos
  }

  render() {
    let todoList = this.props.todos.map(todo => {
      return <TodoListItem
        key={('todo_item_' + todo.id)}
        todoListItem={todo}
        deleteTodo={this.props.deleteTodo}
        onClickCompleted={this.props.onClickCompleted} />
    })
    return (
      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todoList}
        </ul>
      </section>
    )
  }
}



//  function TodoList ({ todos}) {
//     let deleteTodo = (id) => {
//       console.log('del ', id);
//     }
//       let todoList = todos.map(todo => {
//         return <TodoListItem
//         todoListItem = {todo}
//         deleteTodo = {deleteTodo} />
//       })
//       return (
//         <section className="main">
//            <input type="checkbox" id="toggle-all" className="toggle-all" />
//         <label htmlFor="toggle-all">Mark all as complete</label>
//            <ul className="todo-list">
//            { todoList }
//            </ul>
//         </section>
//       )
//     };

export default TodoList;
