import React from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo'

class TodoList extends React.Component {
    state = {
      todos: [],
      todoToShow: "all",
      toggleAllComplete: true,
    }

    addTodo = (todo) => {
      this.setState({
        todos: [todo, ...this.state.todos]
      });
    }

    toggleComplete = (id) => {
      this.setState({
        todos: this.state.todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              complete: !todo.complete
            }
        } else {
            return todo;
        }
    })
})
    }

updateTodoToShow = (s) => {
  this.setState({
    todoToShow: s,
  });
}

handlDeleteTodo = (id) => {
  this.setState({
    todos: this.state.todos.filter(todo => todo.id !== id)
  });
}

removeAllCompletedTodos = () => {
  this.setState({
    todos: this.state.todos.filter(todo => !todo.complete)
  });
}

render() {
  let todos = [];

  if (this.state.todoToShow === 'all') {
    todos = this.state.todos ;
  } else if (this.state.todoToShow === "active") {
    todos = this.state.todos.filter(todo => !todo.complete);
  } else if (this.state.todoToShow === "complete") {
    todos = this.state.todos.filter(todo => todo.complete);
  }

  return (
    <div>
      <TodoForm onSubmit={this.addTodo}/>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          toggleComplete={() => this.toggleComplete(todo.id) }
          onDelete={() => this.handlDeleteTodo(todo.id)}
          todo={todo}
        />
      ))}
      <div>
        todos left:
        {this.state.todos.filter(todo => !todo.complete).length}</div>
      <div>
        <button
          onClick={() => this.updateTodoToShow("all")}>All</button>
        <button
          onClick={() => this.updateTodoToShow("active")}>Active</button>
        <button
          onClick={() => this.updateTodoToShow("complete")}>Complete</button>
      </div>
      {this.state.todos.some(todo => todo.complete) ? (
        <div>
          <button
            onClick={this.removeAllCompletedTodos}>Remove all complete todos</button>
        </div>
      ) : null }
      <div>
        <button onClick={() => this.setState ({
          todos: this.state.todos.map(todo => ({
            ...todo,
            complete: this.state.toggleAllComplete
          })),
          toggleAllComplete: !this.state.toggleAllComplete
        })}>
                toggle all complete: {`${this.state.toggleAllComplete}`}
        </button>
      </div>
    </div>
  );
}
}

export default TodoList;
