import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"
import userEvent from "@testing-library/user-event";

describe("Counter", () => {

    it("displays a name if provided one", () => {
        const counter = render(<Counter name='me'/>);
        const counterName = screen.getByTestId("counter-name");

        expect(counterName.textContent).toContain("me");
        counter.unmount()
        //here is the syntax to unmount a simulated component after a test.
        //first render it, assigning it to const. then unmount it.
        //Can also use destructure syntax const { unmountCounter } then
        // unmountCounter()
        const counter2 = render(<Counter/>)
        const counterName2 = screen.getByTestId("counter-name");
        expect(counterName2.textContent).toContain("a Guest");
        counter2.unmount()
    })

    it("increments counter on button click", async () => {
        render(<Counter />);
        const button = screen.getByRole("button", {name: /increment/i })
        const counterValue = screen.getByTestId("counter-display");

        expect(counterValue.textContent).toContain("0");
        expect(counterValue.textContent).toEqual("Count is 0")

        await userEvent.click(button);

        expect(counterValue.textContent).toContain("1");

        //await userEvent.type(input, "text input on a component")
        //an example of simulating a user typing something into an input
    })

    
})