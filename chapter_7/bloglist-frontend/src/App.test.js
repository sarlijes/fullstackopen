import React from "react"
import { render, waitForElement } from "@testing-library/react"
jest.mock("./services/__mocks__/blogs")
import App from "./App"

describe("<App />", () => {
    test("show login page if no logged in user", async () => {
        let component

        component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText("login")
        )

        expect(component.container).toHaveTextContent("username")
        expect(component.container).toHaveTextContent("password")

    })

    test("show blog list if logged in user", async () => {

        const user = {
            username: "tester",
            token: "1231231214",
            name: "Donald Tester"
        }

        localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))

        let component

        component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText("new blog")
        )

        expect(component.container).toHaveTextContent(
            "Donald Tester logged in"
        )
    })
})

