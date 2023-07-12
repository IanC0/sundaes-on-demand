import {render, screen} from "@testing-library/react";

import Options from '../Options'

test('displays image for each scoop from the server', () => {
    render(<Options optionType="scoops" />)

    // find images
    const scoopImages = screen.getAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).willHaveLength(2);

    // confirm alt text of imges
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
})