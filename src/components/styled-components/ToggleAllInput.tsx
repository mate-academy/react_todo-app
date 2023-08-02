import styled from 'styled-components';

export const ToggleAllInput = styled.input`
  width: 1px;
  height: 1px;
  border: none;
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;

  &:checked + label:before {
    color: #737373;
  }

  & + label {
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: -52px;
    left: -13px;
    transform: rotate(90deg);

    &:before {
      content: '❯';
      font-size: 22px;
      color: #e6e6e6;
      padding: 10px 27px;
    }
  }

  @media screen and (min-resolution: 0dppx) {
    background: none;
  }
`;
