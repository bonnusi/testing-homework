import React from 'react';

import { render } from '@testing-library/react';
import { CartBadge } from '../../src/client/components/CartBadge';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore();
const store = mockStore({
  cart: { 1: { name: 'Test', count: 1, price: 300 } },
});

describe('The cart badge component', () => {
  test('With cart element', () => {
    render(
      <Provider store={store}>
        <CartBadge id={1} />
      </Provider>
    );
    const spanElement = document.querySelector('span');

    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent('Item in cart');
  });

  test('Without element in cart ', () => {
    render(
      <Provider store={store}>
        <CartBadge id={2} />
      </Provider>
    );

    const spanElement = document.querySelector('span');

    expect(spanElement).not.toBeInTheDocument();
  });
});
