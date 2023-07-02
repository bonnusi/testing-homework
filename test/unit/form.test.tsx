import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { Form } from '../../src/client/components/Form';
import '@testing-library/jest-dom/extend-expect';

describe('The form component', () => {
  test('Valid data', () => {
    const onSubmitMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <Form onSubmit={onSubmitMock} />
    );

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Phone'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(getByLabelText('Address'), {
      target: { value: '123 Main St' },
    });

    fireEvent.click(getByText('Checkout'));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'John Doe',
      phone: '1234567890',
      address: '123 Main St',
    });
  });

  test('Empty data', () => {
    const onSubmitMock = jest.fn();

    const { getByText } = render(<Form onSubmit={onSubmitMock} />);

    fireEvent.click(getByText('Checkout'));

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  test('Check valid text errors', () => {
    const onSubmitMock = jest.fn();

    const { getByText, getByLabelText } = render(
      <Form onSubmit={onSubmitMock} />
    );

    fireEvent.change(getByLabelText('Name'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Phone'), { target: { value: '123' } });
    fireEvent.change(getByLabelText('Address'), { target: { value: '' } });

    fireEvent.click(getByText('Checkout'));

    expect(getByText('Please provide your name')).toBeInTheDocument();
    expect(getByText('Please provide a valid phone')).toBeInTheDocument();
    expect(getByText('Please provide a valid address')).toBeInTheDocument();
    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
