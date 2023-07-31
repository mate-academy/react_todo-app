import { styled } from 'styled-components';

export const FiltersList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;

  & li {
    display: inline;
  }

  @media (max-width: 430px) {
    bottom: 10px;
  }
`;
