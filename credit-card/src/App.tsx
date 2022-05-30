import styled from "styled-components";
import PaymentForm from "components/PaymentForm";

function App() {
  return (
    <Container>
      <PaymentForm />
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #d3e9fc;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  padding-bottom: 4rem;

  @media (min-width: 400px) {
    place-items: center;
  }
`;
