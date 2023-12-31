import { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

import { OrderDetailsProvider } from "./contexts/OrderDetails";

export default function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  let Component = OrderEntry; // dfault to order page
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <Container>
      <OrderDetailsProvider>
        <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}
