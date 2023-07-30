import {
  cleanup,
  render,
  screen,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
// import { userEvent } from "@testing-library/user-event/dist/types/setup";

describe("scoops and toppings", () => {
  test("update scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
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
    const toppingsTotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsTotal).toHaveTextContent("$0.00", { exact: false });

    // add cherries and check subtotal
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent("$1.50");

    // add hot fudge and check subtotal
    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("$3.00");

    // remove hot fudge and check subtotal
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("$1.50");
  });
});

describe("grand total", () => {
  const user = userEvent.setup();


  // test("page loading", () => {
  //   const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
  //   expect(grandTotal).toBeTruthy();
  // });

  test("grand total starts at $0", () => {
    const {unmount} = render(<OrderEntry />)
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent(/\$0\.00$/);
    unmount();
  }),
    test("grand total updates properly if scoop is added first", async () => {
      render(<OrderEntry />)
      const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
      const vanillaScoop = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      const hotFudgeCheckbox = await screen.findByRole("checkbox", {
        name: "Hot fudge",
      });
      await user.clear(vanillaScoop);
      await user.type(vanillaScoop, "1");
      await user.click(hotFudgeCheckbox);
      expect(grandTotal).toHaveTextContent(/\$3\.50/);
      await user.click(hotFudgeCheckbox);
    }),
    test("grand total updates properly if topping is added first", async () => {
      render(<OrderEntry />)
      const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
      const hotFudgeCheckbox = await screen.findByRole("checkbox", {
        name: "Hot fudge",
      });
      const vanillaScoop = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      await user.click(hotFudgeCheckbox);
      await user.clear(vanillaScoop);
      await user.type(vanillaScoop, "1");
      expect(grandTotal).toHaveTextContent(/\$3\.50/);
    });
  test("grand total updates properly if an item is remove", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, "2");

    await user.clear(vanillaScoop);
    await user.type(vanillaScoop, "1");
    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent(/\$3\.50/);
    await user.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent(/\$2.00/);
  });
});
