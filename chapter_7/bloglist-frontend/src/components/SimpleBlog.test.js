import React from "react"
import { render, fireEvent } from "@testing-library/react"
import SimpleBlog from "./SimpleBlog"

test("renders content", () => {
    const blog = {
        title: "Component testing",
        author: "Ken Lee",
        likes: 3
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        "Component testing"
    )

})

test("renders title, author and likes", () => {
    const blog = {
        title: "Component testing",
        author: "Ken Lee",
        likes: 3
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    const title = component.container.querySelector(".title")
    expect(title).toHaveTextContent(
        "Component testing"
    )

    const author = component.container.querySelector(".author")
    expect(author).toHaveTextContent(
        "Ken Lee"
    )

    const likes = component.container.querySelector(".likes")
    expect(likes).toHaveTextContent(
        "3"
    )

})

test("clicking the like button calls event handler twice", async () => {
    const blog = {
        title: "Component testing",
        author: "Ken Lee",
        likes: 3
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText("like")
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})
