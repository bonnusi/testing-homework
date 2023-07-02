import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Cart } from '../../src/client/pages/Cart';
import { checkout, clearCart } from '../../src/client/store';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

const customHistory = createBrowserHistory();

const mockStore = configureMockStore();

const cart = {
  1: { name: 'Test 1', price: 10, count: 2 },
  2: { name: 'Test 2', price: 15, count: 1 },
};

describe('The cart component', () => {
  it('renders cart is empty', () => {
    const store = mockStore({
      cart: {},
      latestOrderId: undefined,
    });

    const { getByText } = render(
      <Router history={customHistory}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>
    );

    expect(
      getByText('Cart is empty. Please select products in the', {
        exact: false,
      }).textContent
    ).toEqual(
      'Shopping cartCart is empty. Please select products in the catalog.'
    );
  });

  it('clearCart', () => {
    const store = mockStore({
      cart,
      latestOrderId: undefined,
    });

    const { getByText } = render(
      <Router history={customHistory}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>
    );

    fireEvent.click(getByText('Clear shopping cart'));

    const actions = store.getActions();
    expect(actions).toContainEqual(clearCart());
  });


  it('checkout', () => {

    const store = mockStore({
      cart,
      latestOrderId: undefined,
    });

    const { getByText, getByLabelText } = render(
      <Router history={customHistory}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>
    );

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Phone'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(getByLabelText('Address'), {
      target: { value: '123 Main St' },
    });


    fireEvent.click(getByText('Checkout'));
    
    const actions = store.getActions();
    expect(actions).toContainEqual(checkout(expect.any(Object), cart));
  });

  it('display order', () => {
    const latestOrderId = 123;

    const store = mockStore({
      cart: {},
      latestOrderId,
    });

    const { getByText } = render(
      <Router history={customHistory}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>
    );

    expect(getByText('Order #', { exact: false }).textContent).toEqual(
      `Order #${latestOrderId} has been successfully completed.`
    );
  });
});
