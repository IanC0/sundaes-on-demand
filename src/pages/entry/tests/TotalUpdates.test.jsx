import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
// import { userEvent } from "@testing-library/user-event/dist/types/setup";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // expect default toppings are zero
  const toppingsTotal = screen.getByText("Toppings total: $", {exact: false})
  expect(toppingsTotal).toHaveTextContent("$0.00", { exact: false });

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("$1.50");

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("$3.00");

  // remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("$1.50");
});
