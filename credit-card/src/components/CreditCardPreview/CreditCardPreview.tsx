import { formatCreditCard } from "utils";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

interface Props {
  number: string;
  name: string;
  cvv: string;
  type?: string;
  month: string;
  year: string;
  focus?: "front" | "back";
}

const CreditCardPreview = ({
  number,
  name,
  type = "",
  cvv,
  month,
  year,
  focus,
}: Props) => {
  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        {focus === "back" ? (
          <Back
            key="back"
            initial={{ opacity: 0, y: 5 }}
            exit={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className="safe">
              <div className="cvv">
                <div>CVV - {type}</div>
                <div className="cvv-value">{cvv.padEnd(3, "0")}</div>
              </div>
              <div className="stripe" />
            </div>
          </Back>
        ) : (
          <Front
            key="front"
            initial={{ opacity: 0, y: 5 }}
            exit={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Top>
              <div>QL AB</div>
              <div className="type">{type}</div>
            </Top>
            <Number data-testid="card-number-preview">
              {formatCreditCard(number.padEnd(50, "0"))}
            </Number>
            <Bottom>
              <Name>
                <div className="label">Card holder</div>
                <div className="name">{name || "Your name"}</div>
              </Name>
              <Name>
                <div className="label">Expires</div>
                <div className="name">
                  {month || "MM"}/{year.substring(2, 4) || "YY"}
                </div>
              </Name>
            </Bottom>
          </Front>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CreditCardPreview;

const Back = styled(motion.div)`
  position: relative;
  height: 100%;

  .safe {
    position: relative;
    z-index: 1;
    padding: 1.25rem;
  }

  .cvv {
    margin-top: 8rem;
  }

  .cvv-value {
    font-weight: 500;
    font-family: monospace;
    font-size: 1.5rem;
  }

  .stripe {
    position: absolute;
    left: 0;
    top: 2rem;
    width: 100%;
    height: 50px;
    background-color: black;
  }
`;

const Front = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 1.25rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  .type {
    font-weight: 700;
    font-style: italic;
  }
`;

const Name = styled.div`
  .label {
    font-size: 0.75rem;
  }

  .name {
    font-family: monospace;
    font-size: 1rem;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Container = styled.div`
  position: absolute;
  box-shadow: rgb(0 0 0 / 25%) 0px 8px 25px 0px;
  height: 220px;
  width: clamp(340px, 90vw, 400px);
  border-radius: 1rem;
  background: #222222;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  top: -2rem;

  @media (max-width: 400px) {
    top: 1rem;
  }
`;

const Number = styled.div`
  font-family: monospace;
  font-size: 1.75rem;
  letter-spacing: 2px;

  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;
