import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Data from "./Data";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest"
import userEvent from "@testing-library/user-event";

describe("Data", () => {
    // it("displays a name if provided one", () => {
    //     const data = render(<Data name='me'/>);
        
    //     const dataName = screen.getByTestId("counter-name");

    //     expect(dataName.textContent).toContain("me");
    //     data.unmount()
    //     //here is the syntax to unmount a simulated component after a test.
    //     //first render it, assigning it to const. then unmount it.
    //     //Can also use destructure syntax const { unmountCounter } then
    //     // unmountCounter()
    //     const data2 = render(<Data/>)
    //     const dataName2 = screen.getByTestId("counter-name");
    //     expect(dataName2.textContent).toContain("a Guest");
    //     data2.unmount()
    // })
    beforeEach(() =>{
        globalThis.fetch = vi.fn()
    })
    afterEach(() =>{
        vi.resetAllMocks()
    })
    it("Fetches and displays the user data", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            json: async() => ({id: 4, name: "john", email:"john@gmail.com"})
        })
        render(<Data userId={4} />)

        expect(screen.getByTestId('loading').textContent).toContain("...")

        await waitFor(() => {
            expect(screen.getByText("User Name: john")).toBeInTheDocument()
            //can also do getByRole("heading", { name: /john/i })
            expect(screen.getByText("john@gmail.com")).toBeInTheDocument()
        })
    })
})