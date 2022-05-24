import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { click } from "@testing-library/user-event/dist/click";
import React from "react";
import List from "./Components/List";
import Todolist from "./Todolist";

afterEach(() => {
    const deletebtn = Array.from(document.querySelectorAll<any>('button'));
    deletebtn.forEach(button => button.click());
    cleanup();
})
describe('Todolist', () => {
    test("has an input field", () => {
        const { getByTestId } = render(<Todolist/>)
        expect(getByTestId("addname")).toBeInTheDocument();
    })

    test("has an input field", () => {
        const { getByTestId } = render(<Todolist/>)
        expect(getByTestId("quantity")).toBeInTheDocument();
    })
    
    test("render the list with buttons", async() => {
        render(<Todolist/>);
        const btnList = await screen.findAllByRole("button")
        expect(btnList).toHaveLength(1)
    })

    test("Renders Product Name Label", () => {
        render(<Todolist />);
        const linkElement = screen.getByText("Product Name:");
        expect(linkElement).toBeInTheDocument();
    });

    test("Renders Quantity label", () => {
        render(<Todolist/>);
        const linkElement = screen.getByText("Quantity:")
        expect(linkElement).toBeInTheDocument();
    })

    test("Testing using event", () => {
        const {getByTestId, getByText } = render(<Todolist/>)
        userEvent.type(getByTestId("addname"), "test");
        expect(getByTestId("addname")).toHaveValue('test')
    })

    test("Testing using event", () => {
        const {getByTestId, getByText } = render(<Todolist/>)
        userEvent.type(getByTestId("quantity"), "4");
        expect(getByTestId("quantity")).toHaveValue(4)
    })

    test("When the add button is pressed, it creates a new item name", () => {
        const { getByTestId, getByText } = render(<Todolist />);
        const event = { target: { value: "apple" } };
        fireEvent.change(getByTestId("addname"), event);
        expect(getByTestId("addname")).toHaveValue("apple");
        fireEvent.click(getByTestId("addlist"));
        expect(getByText("apple")).toBeInTheDocument();
    });

    test("When the add button is pressed, it creates a new item Quantity", () => {
        const { getByTestId, getByText } = render(<Todolist/>);
        const event = { target: { value: 10}};
        fireEvent.change(getByTestId("quantity"), event);
        expect(getByTestId("quantity")).toHaveValue(10)
        fireEvent.click(getByTestId("addlist"));
        expect(getByText(10)).toBeInTheDocument();
    })
    
    // test("should delete the selected item from the list", () => {
    //     const data = render(<Todolist/>);
    //     const inputElem = data.getByTestId('addname')
    //     const createbtn = data.getByTestId('addlist')
    //     // console.log('addlist')

    //     // Create the todo.
    //     fireEvent.change(inputElem, { target: { value: 'apple'}})
    //     fireEvent.click(createbtn);

    //     // Get the newly created todo.
    //     const todo = data.queryByTestId('todoData');

    //     // Click the delete button on the todo.
    //     const todoDeleteBtn = data.getByTestId('deleteButton');
    //     fireEvent.click(todoDeleteBtn)

    //     const todos = data.queryAllByTestId('todoData')
    //     expect(todo).toBeInTheDocument();
    //     expect(todos.length).toBe(0);
    // })

    // test('delete', () => {
    //     const data = render(<Todolist/>);
    //     const inputElem = data.getByTestId('addname')
    //     const createbtn = data.getByTestId('addlist')
    //     fireEvent.change(inputElem, { target: { value: 'apple'}})
    //     expect(inputElem.value).toBe('apple')
    //     fireEvent.change(inputElem, { target: { value: ''}})
    //     expect(inputElem.value).toBe('')
    // })
})

