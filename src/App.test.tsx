import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // const linkElement = screen.getByText(/資格取得補助システム/i);
  // expect(linkElement).toBeInTheDocument();
  // expect(1).to.be.equal(1);
});
