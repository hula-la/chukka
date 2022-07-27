import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  background-color: #ff2c55;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  width: 140px;
  height: 42px;
  cursor: pointer;
  &:hover {
  }
`;

const Button = (props) => {
  return <StyledButton>{props.content}</StyledButton>;
};

export default Button;
