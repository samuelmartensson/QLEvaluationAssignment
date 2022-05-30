import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props<T>
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, "name"> {
  defaultOption?: string;
  options: { label: string; value: T }[];
  label?: string;
  name: string;
}

const SelectField = <T extends string | number>({
  options,
  label,
  name,
  defaultOption = "Select",
  ...rest
}: Props<T>) => {
  return (
    <Root>
      {label && <Label>{label}</Label>}
      <Select {...rest} data-testid={name}>
        <option value="" style={{ display: "none" }}>
          {defaultOption}
        </option>
        {options.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    </Root>
  );
};

export default SelectField;

const Select = styled.select`
  border-radius: 0.25rem;
  padding: 0 1rem;
  border: 1px solid lightgray;
  font-size: 1rem;
  height: 3rem;
  outline: none;

  &:focus {
    box-shadow: rgb(0 0 0 / 15%) 0px 1px 5px 0px;
    border: 1px solid #7dc5fd;
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;
