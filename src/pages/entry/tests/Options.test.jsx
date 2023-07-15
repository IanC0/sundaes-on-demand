import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping from server", async () => {
  render(<Options optionType="toppings" />);
  
  const toppingImages = await screen.findAllByRole('img', {name: /topping$/i});
  expect(toppingImages).toHaveLength(3);

  const toppingAltText = toppingImages.map(img => img.alt);
  expect(toppingAltText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping'
  ])
});
