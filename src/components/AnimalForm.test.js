import AnimalForm from "./AnimalForm";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test('Renders without errors', () => {
    render(<AnimalForm />);
})

test('when user fills all fields and submits, species appears in list', async () => {
    // Arrange: get onto screen and come up with species
    render(<AnimalForm />)
    const species = 'feline';

    // Act: filling out form and hitting submit button
    const speciesInput = screen.getByLabelText(/species:/i);
    userEvent.type(speciesInput, species);

    const ageInput = screen.getByLabelText(/age:/i);
    userEvent.type(ageInput, '9');

    const notesInput = screen.getByLabelText(/notes:/i);
    userEvent.type(notesInput, 'whatever I want');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    // Assert:
    await waitFor(() => {
        const speciesFeedback = screen.queryByText(species);
        expect(speciesFeedback).toBeInTheDocument();
    })
})