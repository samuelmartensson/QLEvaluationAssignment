import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import PaymentForm from "./PaymentForm";

test("renders consistent number and format between form and preview", () => {
  render(<PaymentForm />);
  const input = screen.getByTestId("cardNumber");
  const cardNumberPreview = screen.getByTestId("card-number-preview");
  expect(cardNumberPreview).toHaveTextContent("0000 0000 0000 0000");

  user.type(input, "4142412421232312");
  expect(input).toHaveValue("4142 4124 2123 2312");
  expect(cardNumberPreview).toHaveTextContent("4142 4124 2123 2312");
});

test("returns correctly formatted data on submit", () => {
  render(<PaymentForm />);

  const details = {
    number: "4141144354463612",
    numberFormatted: "4141 1443 5446 3612",
    cvv: "532",
    name: "Test personson",
    month: "5",
    year: "2027",
  };

  const cardNumber = screen.getByTestId("cardNumber");
  const cardName = screen.getByTestId("cardName");
  const month = screen.getByTestId("month");
  const year = screen.getByTestId("year");
  const cvv = screen.getByTestId("cvv");
  const submitBtn = screen.getByTestId("submit");

  user.type(cardNumber, details.number);
  user.type(cardName, details.name);
  user.selectOptions(month, [details.month]);
  user.selectOptions(year, [details.year]);
  user.type(cvv, details.cvv);
  user.click(submitBtn);

  const result = JSON.parse(screen.getByTestId("result").textContent || "");

  expect(result.cardNumber.value).toEqual(details.numberFormatted);
  expect(result.month).toEqual(details.month);
  expect(result.year).toEqual(details.year);
  expect(result.cvv).toEqual(details.cvv);
});
