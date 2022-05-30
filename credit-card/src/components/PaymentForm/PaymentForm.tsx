import { formatCreditCard } from "utils";
import CreditCardPreview from "components/CreditCardPreview";
import SelectField from "components/SelectField";
import TextField from "components/TextField";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import ccValidator from "card-validator";

const PaymentForm = () => {
  const [focus, setFocus] = useState<"front" | "back">("front");
  const [cardNumber, setCardNumber] = useState({ value: "", error: "" });
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const currentCard = useMemo(
    () => ccValidator.number(cardNumber.value).card,
    [cardNumber.value]
  );
  const cardType = useMemo(() => currentCard?.niceType, [currentCard]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      // Handle payment
      setResult(JSON.stringify({ cardNumber, month, year, cvv }));
      console.log({ cardNumber, month, year, cvv });
    },
    [cardNumber, month, year, cvv]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <CreditCardPreview
        {...{
          month,
          year,
          cvv,
          name,
          focus,
          number: cardNumber.value,
          type: cardType,
        }}
      />
      <TextField
        name="cardNumber"
        required
        error={cardNumber.error}
        value={cardNumber.value}
        onChange={(event) => {
          const value = event.target.value;

          if (isNaN(Number(value.replaceAll(" ", "")))) {
            return;
          }
          setCvv("");
          setCardNumber({
            value: formatCreditCard(event.target.value),
            error: !ccValidator.number(formatCreditCard(event.target.value))
              .isPotentiallyValid
              ? "Invalid card"
              : "",
          });
        }}
        onBlur={(event) => {
          setCardNumber((state) => ({
            ...state,
            error: !ccValidator.number(formatCreditCard(event.target.value))
              .isValid
              ? "Invalid card"
              : "",
          }));
        }}
        label={`Card number${cardType ? " - " + cardType : ""}`}
      />
      <TextField
        name="cardName"
        required
        value={name.trimStart()}
        onChange={(event) => {
          setName(event.target.value);
        }}
        label="Card name"
      />
      <Date>
        <SelectField
          name="month"
          required
          defaultOption="Month"
          onChange={(event) => {
            setMonth(event.target.value);
          }}
          options={[...Array(12).keys()].map((n) => ({
            label: ("0" + (n + 1)).slice(-2),
            value: n,
          }))}
          label="Expiration Date"
        />
        <SelectField
          name="year"
          required
          defaultOption="Year"
          onChange={(event) => {
            setYear(event.target.value);
          }}
          options={[...Array(20).keys()].map((n) => ({
            label: String(2022 + n),
            value: 2022 + n,
          }))}
        />
        <TextField
          name="cvv"
          required
          maxLength={currentCard?.code.size || 4}
          value={cvv}
          onChange={(event) => {
            const value = event.target.value;

            if (isNaN(Number(value.replaceAll(" ", "")))) {
              return;
            }

            setCvv(event.target.value);
          }}
          onFocus={() => setFocus("back")}
          onBlur={() => setFocus("front")}
          label="CVV"
        />
      </Date>
      <Button data-testid="submit" disabled={!!cardNumber.error}>
        Submit
      </Button>
      {result && (
        <pre data-testid="result" style={{ whiteSpace: "normal" }}>
          {result}
        </pre>
      )}
    </Form>
  );
};

export default PaymentForm;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  padding-top: 16rem;
  background: white;
  max-width: 450px;
  box-shadow: rgb(0 0 0 / 15%) 0px 3px 15px 0px;
  border-radius: 0.25rem;
`;

const Date = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const Button = styled.button<{ disabled: boolean }>`
  padding: 1rem;
  background-color: ${(p) => (p.disabled ? "gray" : "#0055d4")};
  color: white;
  border: none;
  font-size: 1.25rem;
  box-shadow: rgb(0 85 212 / 35%) 0px 3px 15px 0px;
  border-radius: 0.25rem;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: 250ms ease;

  &:hover {
    box-shadow: ${(p) =>
      p.disabled
        ? "rgb(0 85 212 / 35%) 0px 3px 15px 0px"
        : "rgb(0 85 212 / 80%) 0px 3px 15px 0px"};
  }
`;
