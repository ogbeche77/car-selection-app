import React from 'react';
import { render } from "@testing-library/react";

import App from './App';



import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Friday Testing", () => {
  test("render title", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("h1").text()).toContain("Select your favourite car make")

    // const { getByText } = render(<App />);
    // const linkElement = getByText("Select your favourite car make");
    // expect(linkElement).toBeInTheDocument();
  });
});
