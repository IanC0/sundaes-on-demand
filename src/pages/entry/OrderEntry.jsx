import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry({setOrderPhase}) {
  const { totals } = useOrderDetails();


  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />;
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <button id="entry-btn" onClick = {() => setOrderPhase("review")}>Order sundae!</button>
    </div>
  );
}
