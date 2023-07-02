import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { addToCart } from '../../src/client/store';

const mockData = {
  id: 1,
  name: 'Test',
  price: 300,
  description: 'Description text',
  material: 'Other',
  color: 'red',
};

const mockStore = configureMockStore();
const store = mockStore({ cart: {} });

describe('The product details component', () => {
  test('Valid data', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductDetails product={mockData} />
      </Provider>
    );

    const nameElement = getByText(mockData.name);
    const priceElement = getByText(`$${mockData.price}`);
    const colorElement = getByText(mockData.color);
    const materialElement = getByText(mockData.material);
    const descriptionElement = getByText(mockData.description);

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(colorElement).toBeInTheDocument();
    expect(materialElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('Test redux click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductDetails product={mockData} />
      </Provider>
    );
    fireEvent.click(getByText('Add to Cart'));

    const actions = store.getActions();
    expect(actions).toContainEqual(addToCart(mockData));
  });
});
