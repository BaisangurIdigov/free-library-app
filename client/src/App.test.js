import React from "react"
import { render, screen } from '@testing-library/react';
import App from './components/Layout';
import SearchInput from './components/pages/SearchInput'

test('renders learn react link', () => {
  // const { getByText } = render(<App/>)
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  const { asFragment } = render(<App />)
  expect(asFragment(<SearchInput/>)).toMatchSnapshot()
});