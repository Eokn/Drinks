import React from "react";
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"

describe("Greeting", () => {
    it("renders a default greeting when not passed a name", () => {
        render(<Greeting/>);
        expect(screen.getByText("Greetings World")).toBeInTheDocument();
    })

    it("renders a greeting when provided a name", () => {
        render(<Greeting name='me' />);

        const possiblyText = screen.queryByText("Greetings to nobody")
        //query returns null if can't find anything. get throws error.
        //I don't understand when you'd use query over get. Maybe for async?
        //The explanation is that you might want to test if a component...
        //doesn't render, rather than expecting it to. so you might try to...
        //query some component that should only sometimes render, to make sure...
        //that it doesn't when it shouldn't. if queryEle === null test pass
        const text = screen.getByText("Greetings me")
        expect(text).toBeInTheDocument();
    })
})