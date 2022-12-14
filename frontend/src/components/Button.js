import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  color: white;
  background-color: #ff2c55;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  width: 140px;
  height: 42px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    z-index: 100;
    background-color: #be2446;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: #be2446;
      cursor: default;
    `}
`;

const Button = (props) => {
  const disabled = props.disabled ? true : null;
  return (
    <StyledButton onClick={props.onClick} disabled={disabled}>
      {props.content}
    </StyledButton>
  );
};

export default Button;
