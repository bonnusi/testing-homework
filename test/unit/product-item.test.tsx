import React from 'react';

import { render } from '@testing-library/react';
import { ProductItem } from '../../src/client/components/ProductItem';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';

const mockData = { id: 1, name: 'Test', price: 300 };

const mockStore = configureMockStore();
const store = mockStore({ cart: {} });

describe('The product item component', () => {
  test('Valid data', () => {
    const customHistory = createBrowserHistory();

    const { getByTestId, getByText } = render(
      <Router history={customHistory}>
        <Provider store={store}>
          <ProductItem product={mockData} />
        </Provider>
      </Router>
    );

    const productItemElement = getByTestId(mockData.id);
    const nameElement = getByText(mockData.name);
    const priceElement = getByText(`$${mockData.price}`);

    expect(productItemElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });
});
