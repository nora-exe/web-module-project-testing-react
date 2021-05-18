# Unit Testing React Module Project: Stranger Things

This module explored passing props into test components, rerendering components and using **mocks** to both monitor functional props and override the functionality of external modules. In this project, you will practice each of these practices in the testing of an application that displays TV show data.

## Introduction
As a developer, you will often be asked to write tests for the feature you are building and even on features other developers have built. In this project, we will mimic a situation where you are asked to test someone else's code.

Get the project fired up and start using it as a user would. Try to go through the user sequences for this feature that you think users would go through. Once you have those in mind, you will have an idea of what to test in your application.

## Objectives
- Understand how to test the effects of passing specific props into a component
- Understand how to monitor the behavior of functional mock props.
- Understand how and when to test using the rerender method
- Learn how to mock the use an external module

![Stranger Example](project_example.gif)

# Notes

* 🎥 [GP](https://youtu.be/_kirfyph290)
* 🎥 [MP](https://www.loom.com/share/d77ba3d65dc9456392a808c34bc323db)

## Key Concepts

* [unit testing](https://www.guru99.com/unit-testing-guide.html)
* [integration testing](https://www.guru99.com/integration-testing.html)

## Key Terminology
* [mock functions](https://jestjs.io/docs/en/mock-functions.html) - Function placeholders use to monitor function execution within a test.
* [mock spies](https://silvenon.com/blog/mocking-with-jest/functions) - Function placeholders that mock the execution of external libraries
* [rerender](https://testing-library.com/docs/react-testing-library/api/#rerender) - A react testing library module use to render a component more then once in a test.
* [async / await](https://javascript.info/async-await) - A javascript syntax that allows simpler, cleaner async code.
* [wait / waitFor](https://testing-library.com/docs/dom-testing-library/api-async/) - React testing library modules that allow a component test to wait until an async call or state chance occurs.

## Reference Materials

* [React Testing Library query cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
* [Jest expect functions](https://jestjs.io/docs/en/expect.html)
* [Jest Mock functions reference](https://www.w3resource.com/jest/mock-functions-api-reference.php)

## Notes
* Testing React Components
* Client-Side Authentication
* HTTP / AJAX II
* Web deployment

React app connected to backend that can: **C**reate **R**ead **U**pdate **D**elete (CRUD) data

Testing react components

* as the props change
* using Mocks
* testing Async API calls

TODAY: Write tests for Passing in
* different values as props to a component
* mock function as props to a component

Test

* a fake api call w mocks
* testing transitions w rerendering

💡 AAA
* **Arrange** - setup component I'm testing
* **Act** - execute behavior & extract what I'm testing
* **Assert** - check if got expected response

⚡ Questions to ask yourself when developing component unit tests:
* Does the component render by default without errors?
* How does the component change depending on the props passed in?
* Does the component respond to user input?
* Does the component respond to state change (async calls / redux)?
* Does the component have error states?
* Be specific about your test cases. When X happens then component does Y.

Mocks - allow fake function/props
* Use to pass into props of a component.
* Can create our own fake output.
* Can monitor its use through the mock property. const mockGetData = jest.fn();

Fake a library call
* When a component loads a library, loads our function instead.
* Can also create our own fake output imoprt { fetchMissions as mockFetchMissions } from "./api/fetchMissions"; jest.mock("./api/fetchMissions");

Examples
```js
//import libraries
import React from "react";
import { render } from "@testing-library/react";
import DoggoImages from "./DoggoImages";

// Arrange
test("renders dog images from API", () => {
  // Act
  const doggoUrls = [
    'url-one.jpg', 'url-two.jpeg', 'url-three.jpg'
  ]
  const { getAllByTestId, rerender } = render(<DoggoImages images={[]} />);

  expect(getAllByTestId(/doggo images/i)).toHaveLength(0);

  // We will rerender the component with our dummy data passed in as the new props
  rerender(<DoggoImages images={doggoUrls} />);

  // Assert that we now have dog images rendering!
  expect(getAllByTestId(/doggo images/i)).toHaveLength(3);
});
```

Mocking async functions:
```js
// import libraries
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { fetchDoggos as mockFetchDoggos } from "../api/fetchDoggos";
import Doggos from "./Doggos";

//create mock *before* setting up test
jest.mock("../ap/fetchDoggos");

// set up test
// add async function
test("renders dog images from API", async () => {
    //mock resolved results
    mockFetchDoggos.mockResolvedValueOnce({
        message: [
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg"
        ]
    });

  const { getByText, getAllByTestId } = render(<Doggos />);

  const fetchDoggosButton = getByText(/fetch doggos/i);
  fireEvent.click(fetchDoggosButton);

    // add new assertion
    expect(mockFetchDoggos).toHaveBeenCalledTimes(1);

    // add await
    await waitFor(() => expect(getAllByTestId(/doggo-images/i)).toHaveLength(3));
});
```

# Instructions
Task 1: Project Set Up

## Task 2: Project Requirements
### The Episode Component
> *This component displays a single episode worth of data. To test it, let's try our some different varieties on what we should pass into our component's props.*

* [✔] Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
* [✔] Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. **Use at least then 3 different types of expect statements to test the the existence of the summary value.**
* [✔] The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to `null`. Test that the alt tag of the image displayed is set to './stranger_things.png'.

## The Show Component
> *This component holds all general information on our featured show. Here we will once again work with data props, mock a function for testing and rerender our component for a change in data.*

* [✔] Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
* [✔] Test that the Show component renders when your test data is passed in through show prop and "none" is passed in through selectedSeason prop.
* [✔] Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
* [✔] Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
* [✔] Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select DOM element and userEvent reference materials to see how to trigger a selection.
* [✔] Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.

## The Display Component
> *This component holds the state values of the application and handles api calls. In this component's tests, you work with mocking external modules and working with async / await / waitFor*
* [✔] Test that the Display component renders without any passed in props.
* [✔] Rebuild or copy the show test data element as used in the previous set of tests.
* [✔] Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
* [✔] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
* [✔] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.

## Stretch goals

- Add in a testing suite for the episodes component.

- Look up the `TVMaze` API. Add a dropdown with the titles of some other popular shows. Add the user sequence of choosing a different show to fetch data for different shows.

- Add React Router, and add the functionality to click an episode and navigate to an episode page.
