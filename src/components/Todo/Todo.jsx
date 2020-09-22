import React, { useState, useEffect } from 'react';


export const Todo = ({ todoItem }) => {

  return (
    <li key={todoItem.key}>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>{todoItem.title}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
