import React from 'react';
import TodoApp from './TodoApp';

class App extends React.Component {
  state = {
    todoList: [],
    query: '',
    checkedAll: false,
  };

  componentWillMount() {
    if (localStorage.getItem('todoList')) {
      this.setState(({
        todoList: JSON.parse(localStorage.getItem('todoList')),
        checkedAll: JSON.parse(
          localStorage
            .getItem('todoList')
        )
          .every(todo => todo.completed),
        selected: 'all',
      }));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleTodoCheck = (id) => {
    this.setState((state) => {
      const currentTodo = state.todoList.find(todo => todo.id === id);

      currentTodo.completed = !currentTodo.completed;
    });
    this.setState(state => ({
      checkedAll: state.todoList.every(todo => todo.completed),
    }));
    this.forceUpdate();
  };

  editTodo = (id, todoValue) => {
    if (todoValue === '') {
      this.deleteTodo(id);
    } else {
      this.setState((state) => {
        const currentTodo = state.todoList.find(todo => todo.id === id);

        currentTodo.todo = todoValue;
        currentTodo.completed = false;
      });
      this.setState(state => ({
        checkedAll: state.todoList.every(todo => todo.completed),
      }));
    }

    this.forceUpdate();
  };

  addTodo = (event) => {
    event.preventDefault();
    if (this.state.query !== '') {
      const todo = {
        completed: false,
        todo: this.state.query,
        id: Date.now(),
      };

      this.setState(state => ({
        todoList: state.todoList.concat(todo),
        query: '',
      }));
    }

    if (this.state.checkedAll) {
      this.setState({ checkedAll: false });
    }
  };

  handleCheckAll = () => {
    this.setState(state => (state.todoList.every(todo => todo.completed)
      ? {
        todoList: state.todoList.map(todo => ({
          ...todo,
          completed: !todo.completed,
        })),
        checkedAll: false,
      }
      : {
        todoList: state.todoList.map(todo => ({
          ...todo,
          completed: true,
        })),
        checkedAll: true,
      }));
  };

  deleteChecked = () => {
    this.todoFilter();
    this.setState(state => ({
      todoList: state.todoList.filter(todo => !todo.completed),
      selected: 'all',
    }));
  };

  filter = (event) => {
    this.setState({ selected: event.target.name });
  };

  todoFilter = (selected) => {
    const { todoList } = this.state;

    switch (selected) {
      case 'active':
        return todoList.filter(todo => todo.completed === false);
      case 'completed':
        return todoList.filter(todo => todo.completed === true);
      default:
        return todoList;
    }
  };

  deleteTodo = (id) => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => todo.id !== id),
      checkedAll: state.todoList.every(
        todo => todo.completed || todo.id === id
      ),
    }));
    if (this.state.todoList.length === 1) {
      this.setState({ checkedAll: false });
    }
  };

  render() {
    const {
      todoList, query, selected, checkedAll,
    } = this.state;

    const filteredTodoList = this.todoFilter(selected);
    const filterArray = ['All', 'Active', 'Completed'];

    return (
      <TodoApp
        editTodo={this.editTodo}
        todoList={todoList}
        handleCheckAll={this.handleCheckAll}
        checkedAll={checkedAll}
        addTodo={this.addTodo}
        query={query}
        handleChange={this.handleChange}
        filteredTodoList={filteredTodoList}
        deleteTodo={this.deleteTodo}
        handleTodoCheck={this.handleTodoCheck}
        selected={selected}
        filterArray={filterArray}
        deleteChecked={this.deleteChecked}
        filter={this.filter}
      />
    );
  }
}

export default App;
