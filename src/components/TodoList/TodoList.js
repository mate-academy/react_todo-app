import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

class TodoList extends React.Component {
  state = {
    todos: this.props.todos
  }

  filter(filter) {
    switch (filter) {
      case 'active':
       return this.props.todos.filter(todo => !todo.comleted);
       // console.log('2')
      case 'done':
         return this.props.todos.filter(todo => todo.comleted);
       // console.log('3')
      default:
        return this.props.todos;
    }
  }
  render() {
    const {filter} = this.props;

    let todoList = this.filter(filter).map(todo => {
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
