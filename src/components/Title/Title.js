import React from 'react';
import { titleType } from '../../typedefs/titleType';
import './Title.scss';

export const Title = ({ title }) => <h1 className="title">{title}</h1>;

Title.defaultProps = {
  title: 'Simple title',
};

Title.propTypes = titleType.isRequired;
