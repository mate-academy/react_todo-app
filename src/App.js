import React, { PureComponent } from 'react';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const todosFromServer = JSON.parse(localStorage.getItem('todos')) || [];
const FILTER_TYPES = {
  all: 'all',
  completed: 'completed',
  active: 'active',
}
const filterButtons = [
  {
    type: FILTER_TYPES.all,
    href: '#/',
    text: 'All',
  },
  {
    type: FILTER_TYPES.active,
    href: '#/active',
    text: 'Active',
  },
  {
    type: FILTER_TYPES.completed,
    href: '#/completed',
    text: 'Completed',
  },
];

class App extends PureComponent {
  state = {
    todoList: [...todosFromServer],
    editingTodoId: 0,
    activeFilter: FILTER_TYPES.all,
    selectedAll: false,
  }

  componentDidMount() {
    this.checkSelectedAll();
  }

  componentDidUpdate() {
    const { todoList } = this.state;

    localStorage.setItem('todos', JSON.stringify([...todoList]));
    this.checkSelectedAll();
  }

  addNewTodo = (title) => {
    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          id: +new Date(),
          title,
          completed: false,
        },
      ],
      selectedAll: false,
    }));
  }

  toggleTodoStatus = ({ target }) => {
    const id = parseInt(target.id);

    this.setState(state => ({
      todoList: state.todoList.map(todo => (
        (todo.id === id)
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )),
      selectedAll: false,
    }), this.checkSelectedAll());

    this.checkSelectedAll();
  };

  toggleTodoAllStatus = ({ target }) => {
    this.setState(state => ({
      ...state,
      todoList: [...state.todoList].map(todo => ({
        ...todo,
        completed: !state.selectedAll,
      })),
      selectedAll: !state.selectedAll,
    }));
  }

  checkSelectedAll = () => {
    const { todoList } = this.state;
    const activeTodos = todoList.filter(todo => todo.completed).length
    const isSelectedAll = (todoList.length !== 0) ? activeTodos === todoList.length : false;

    this.setState({ selectedAll: isSelectedAll });
  }

  setEditingId =(id) => {
    this.setState(state => ({
      ...state,
      editingTodoId: id || 0,
    }));
  }

  setTodoValue = (id, field, value) => {
    this.setState(state => ({
      ...state,
      todoList: [...state.todoList].map(todo => (
        todo.id === id
          ? {
            ...todo,
            [field]: value,
          }
          : todo
      )),
      editingTodoId: 0,
    }));
  }

  deleteTodo = (id) => {
    this.setState(state => ({
      todoList: [...state.todoList].filter(todo => todo.id !== id),
    }));
  }

  setFilter = (e) => {
    e.preventDefault();

    const { name } = e.target;

    this.setState({ activeFilter: name });
  }

  getFilteredTodos = () => {
    const { todoList, activeFilter } = this.state;

    if (activeFilter === FILTER_TYPES.completed) {
      return todoList.filter(todo => todo.completed);
    }

    if (activeFilter === FILTER_TYPES.active) {
      return todoList.filter(todo => !todo.completed);
    }

    return todoList;
  }

  clearComplited = () => {
    this.setState(state => ({
      todoList: state.todoList.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todoList, editingTodoId, activeFilter, selectedAll } = this.state;
    const filteredTodoList = this.getFilteredTodos();

    return (
      <section className="todoapp">
        <Header addNewTodo={this.addNewTodo} />

        <TodoList
          todoList={filteredTodoList}
          editingTodoId={editingTodoId}
          selectedAll={selectedAll}
          toggleTodoStatus={this.toggleTodoStatus}
          toggleTodoAllStatus={this.toggleTodoAllStatus}
          deleteTodo={this.deleteTodo}
          setEditingId={this.setEditingId}
          setTodoValue={this.setTodoValue}
        />

        <Footer
          todoList={todoList}
          filterButtons={filterButtons}
          activeFilter={activeFilter}
          setFilter={this.setFilter}
          clearComplited={this.clearComplited}
        />
      </section>
    );
  }
}

export default App;
