/** Tasks
* [✔] Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
* [✔] Test that the Show component renders when your test data is passed in through show prop and "none" is passed in through selectedSeason prop.
* [✔] Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
* [✔] Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
* [✔] Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select DOM element and userEvent reference materials to see how to trigger a selection.
* [✔] Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from '../Show';

//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
const testShow = {
    name: "show",
    summary: "summary",
    seasons: [
        {
            id: 0,
            name: "S1",
            episodes: []
        },
        {
            id: 1,
            name: "S2",
            episodes: []
        },
        {
            id: 2,
            name: "S3",
            episodes: []
        },
        {
            id: 3,
            name: "S4",
            episodes: []
        },
    ]
};

//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
test('renders testShow and no selected Season without errors', () => {
    render(<Show show={testShow} selectedSeason={"none"}/>);

});

//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>);
    const loading = screen.getByTestId('loading-container');
    expect(loading).toBeInTheDocument();
});

//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectedSeason={"none"} />);
    const seasonOptions = screen.getAllByTestId('season-option');
    expect(seasonOptions).toHaveLength(4);
});

//5. Test that when an item is selected, the handleSelect function is called.
// Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
// https://testing-library.com/docs/ecosystem-user-event/#selectoptionselement-values
test('handleSelect is called when an season is selected', () => {
    // mock handleSelect to pass in
    const handleSelect = jest.fn();
    
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect} />);
    const select = screen.getByLabelText(/Select/i);
    userEvent.selectOptions(select, ['3']);

    expect(handleSelect).toBeCalled();
});

//6. Test that the episode component DOES NOT render when the selectedSeason props is "none"
//and DOES render the episode component when the selectedSeason prop has a valid season index.
test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={testShow} selectedSeason={"none"}></Show>);
    let episodes = screen.queryByTestId("episodes-container");
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={testShow} selectedSeason={2}/>)
    episodes = screen.getByTestId("episodes-container");
    expect(episodes).toBeInTheDocument();
});