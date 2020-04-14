import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor, waitForElement, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios';

import store from '../src/store';
import { Board } from '../src/board';

afterEach(cleanup);

const renderComponent = () => {
    const comp = render(
        <Provider store={store}>
            <Board boardId="1"/>
        </Provider>
    );
    return comp;
}

describe("Board Initial State", () => {
    it('renders Empty Board component', async () => {
        const {  getByTestId } = renderComponent();
        const boardHeader = await waitFor(() =>  getByTestId(/header/i) );
        expect(boardHeader).toHaveTextContent('Board');
    });
    it('renders Add Task List Component', async () => {
        const { getByTestId } = renderComponent();
        const taskListWrapper = await waitFor(() =>  getByTestId(/taskListWrapper/i) );
        expect(taskListWrapper.children.length).toBe(1);
    })
    it('adds task list', async () => {
        const component = renderComponent();
        const { getByTestId } = component;
        const [
            taskListWrapper, 
            addTaskListInput, 
            addTaskListButton] = await waitFor( () =>  [
                getByTestId(/taskListWrapper/i), 
                getByTestId(/addTaskListInput/i),  
                getByTestId(/addTaskListButton/i) ] );
        fireEvent.change(addTaskListInput, { target: { value: 'To Do' } })
        fireEvent.click(addTaskListButton);
        axios.get(() =>
            Promise.resolve({
                data: { name: "To Do", boardId: 1, id:1}
            })
        );
        expect(taskListWrapper.children.length).toBe(4);
    })
    it('adds task', async () => {
        const component = renderComponent();
        const { getByTestId } = component;
        const [
            taskWrapper,
            addTaskInput,
            addTaskButton] = await waitFor( () =>  [
                getByTestId(/taskWrapper/i),
                getByTestId(/addTaskInput/i),
                getByTestId(/addTaskButton/i)] );
        fireEvent.change(addTaskInput, { target: { value: 'Task 1' } })
        fireEvent.click(addTaskButton);
        axios.get(() =>
            Promise.resolve({
                data: { name: "Task 1", taskListId: 1, id:1}
            })
        );
        expect(taskWrapper.children.length).toBe(4);
    });
})