import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Catalog } from '../../src/client/pages/Catalog';
import '@testing-library/jest-dom/extend-expect';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

const mockStore = configureMockStore();

const customHistory = createBrowserHistory();

const cartMock = { cart: { 1: { name: 'Test', count: 1, price: 300 } } };

describe('The catalog component', () => {
  it('render LOADING', () => {
    const store = mockStore({
      products: null,
      ...cartMock,
    });

    render(
      <Router history={customHistory}>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </Router>
    );

    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });

  it('render products', async () => {
    const products = [
      { id: 1, name: 'Test 1', price: 10 },
      { id: 2, name: 'Test 2', price: 15 },
    ];

    const store = mockStore({
      products,
      ...cartMock,
    });

    render(
      <Router history={customHistory}>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </Router>
    );

    products.forEach((product) => {
      expect(screen.getAllByTestId(product.id)).toHaveLength(2);
    });
  });
});
