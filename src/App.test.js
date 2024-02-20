import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders todo list with add task input and button', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const addTaskInput = getByPlaceholderText('Enter a task');
  const addButton = getByText('Add');

  expect(addTaskInput).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test('adds a new task to the todo list', () => {
  const { getByPlaceholderText, getByText, getByText: getByTextWithMarkup } = render(<App />);
  const addTaskInput = getByPlaceholderText('Enter a task');
  const addButton = getByText('Add');

  fireEvent.change(addTaskInput, { target: { value: 'Test Task' } });
  fireEvent.click(addButton);

  const newTask = getByTextWithMarkup(/Test Task/);
  expect(newTask).toBeInTheDocument();
});

test('deletes a task from the todo list', () => {
  const { getByText, queryByText } = render(<App />);

  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);

  const deletedTask = queryByText('Test Task');
  expect(deletedTask).toBeNull();
});

test('toggles the status of a task in the todo list', () => {
  const { getByText } = render(<App />);

  const toggleButton = getByText('Update Status');
  fireEvent.click(toggleButton);

  const updatedStatus = getByText('Done');
  expect(updatedStatus).toBeInTheDocument();
});

test('edits a task in the todo list', () => {
  const { getByText, getByPlaceholderText, getByDisplayValue } = render(<App />);

  const editButton = getByText('Take a Bath');
  fireEvent.click(editButton);

  const editInput = getByDisplayValue('Take a Bath');
  fireEvent.change(editInput, { target: { value: 'Edited Task' } });
  fireEvent.blur(editInput);

  const editedTask = getByText('Edited Task');
  expect(editedTask).toBeInTheDocument();
});
