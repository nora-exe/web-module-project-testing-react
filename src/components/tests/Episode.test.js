/* Tasks
* [✔] Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
* [✔] Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. **Use at least then 3 different types of expect statements to test the the existence of the summary value.**
* [✔] The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to `null`. Test that the alt tag of the image displayed is set to './stranger_things.png'.
*/

import React from 'react';
import { render, screen } from '@testing-library/react';

import Episode from './../Episode';

// Test Data
const testEpisode = {
    id:1,
    name: "",
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "sample summary",
    runtime: 1
}

// Default img test
const testEpisodeWithoutImage = {
    id:1,
    name: "",
    image: null,
    season: 1,
    number: 1,
    summary: "sample summary",
    runtime: 1
}


//1. Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
test("renders without error", () => {
    render(<Episode episode={testEpisode} />)
});

//2. Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected.
test("renders the summary test passed as prop", () => {
    render(<Episode episode={testEpisode}/>);
    const summary = screen.getByText(/sample/i);
    
    //Use 3 different expect statements to test the the existence of the summary value.
    expect(summary).toBeInTheDocument();
    expect(summary).toBeDefined();
    expect(summary).toHaveTextContent("sample");    
});

//3. The episode component displays a default value ('./stranger_things.png') when a image url is not provided.
//Create a new piece of test data with the image property set to null.
//Test that the alt tag of the image displayed is set to './stranger_things.png'.
test("renders default image when image is not defined", () => {
    render(<Episode episode={testEpisodeWithoutImage}/>)
    const image = screen.getByAltText('./stranger_things.png'); 
})
