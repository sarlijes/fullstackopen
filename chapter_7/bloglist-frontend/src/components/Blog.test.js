import React from "react"
import { render, fireEvent } from "@testing-library/react"
import SimpleBlog from "./SimpleBlog"

// TODO refactor to use SimpleBlog

const blog = {
    title: "16 NetBeans Shortcut Keys for Code Editing",
    author: "Nam Ha Minh",
    likes: 33
}

const component = render(
    <SimpleBlog blog={blog} />
)

const title = component.container.querySelector(".title")
const author = component.container.querySelector(".author")
const likes = component.container.querySelector(".likes")

test("renders content", () => {
    expect(component.container).toHaveTextContent("16 NetBeans Shortcut Keys for Code Editing")
})

test("renders props", () => {
    expect(title).toHaveTextContent("16 NetBeans Shortcut Keys for Code Editing")
    expect(author).toHaveTextContent("Nam Ha Minh")
    expect(likes).toHaveTextContent("33")
})
