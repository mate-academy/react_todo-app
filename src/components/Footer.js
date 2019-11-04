import React from 'react';

const Footer = (props) => {
    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">{props.activeItemsLength} items left</span>
        <ul className="filters">
          <li>
            <a href="#/"
               className={props.selectedFilter === "all" && "selected"}
               onClick={() => {
                 props.setSelectedFiler("all")
               }}>All</a>
          </li>
          <li>
            <a href="#/active"
               className={props.selectedFilter === "active" && "selected"}
               onClick={() => {
                 props.setSelectedFiler("active")
               }}>Active</a>
          </li>
          <li>
            <a href="#/completed"
               className={props.selectedFilter === "completed" && "selected"}
               onClick={() => {
                 props.setSelectedFiler("completed")
               }}>Completed</a>
          </li>
        </ul>
        <button className="clear-completed" style={{ display: 'block' }}></button>
      </footer>
    )
}

export default Footer;
