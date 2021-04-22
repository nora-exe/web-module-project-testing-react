/**
* [✔] Test that the Display component renders without any passed in props.
* [✔] Rebuild or copy the show test data element as used in the previous set of tests.
* [✔] Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
* [✔] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
* [✔] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
*/

//1. Add in necessary imports and values to establish the testing suite.
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import mockFetchShow from "../../api/fetchShow";
jest.mock('../../api/fetchShow');

import Display from '../Display';

//3. Rebuild or copy a show test data element as used in the previous set of tests.
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

//2. Test that the Display component renders without any passed in props.
test("renders without errors", () => {
    render(<Display />);
});


//4. Test that when the fetch button is pressed, the show component will display. (handleClick)
//Make sure to account for the api call and change of state in building your test.
test('Clicking button renders Show components', async () => {
    //mock
    mockFetchShow.mockResolvedValueOnce(testShow);
    
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument();

    
});

//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
test('when button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data', async () => {
     //mock
     mockFetchShow.mockResolvedValueOnce(testShow);
    
     render(<Display />);
     const button = screen.getByRole('button');
     userEvent.click(button);

     await waitFor(() => {
        const seasonOptions = screen.getAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(4);
     });
});

//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
test('when button is pressed, display is called', async () => {
    //mock
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc} />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    });
});