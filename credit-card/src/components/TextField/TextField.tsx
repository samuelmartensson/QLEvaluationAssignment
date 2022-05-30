import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  label?: string;
  error?: string;
  name: string;
}

const TextField = ({ label, error, name, ...rest }: Props) => {
  return (
    <Root>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input {...rest} name={name} data-testid={name} />
      {error && <Error>{error}</Error>}
    </Root>
  );
};

export default TextField;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  color: #303e5c;
`;

const Error = styled.div`
  font-weight: 700;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: red;
  font-weight: bold;
`;

const Input = styled.input`
  border-radius: 0.25rem;
  padding: 0.75rem;
  outline: none;
  border: 1px solid lightgray;
  color: #303e5c;
  font-size: 1rem;
  width: 100%;
  height: 3rem;

  &:focus {
    box-shadow: rgb(0 0 0 / 15%) 0px 1px 5px 0px;
    border: 1px solid #7dc5fd;
  }
`;
