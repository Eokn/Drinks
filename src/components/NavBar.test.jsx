import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./NavBar";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"

describe("NavBar", () => {
    it("Renders a Navbar with home and about links", () => {
        render(<Navbar/>);
        expect(screen.getByText("home")).toBeInTheDocument();
        expect(screen.getByText("about")).toBeInTheDocument();


        // Code testing paths goes here - test if buttons actually take you to the described paths

    })

    
})