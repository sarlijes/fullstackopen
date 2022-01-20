import React from "react"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

const Wrapper = (props) => {

    const onChange = (event) => {
        props.state.value = event.target.value
    }

    return (
        <BlogForm
            value={props.state.value}
            createNewBlogPost={props.onSubmit}
            handleTitleChange={onChange}
        />
    )
}

test("<BlogForm /> updates parent state and calls onSubmit", () => {
    const onSubmit = jest.fn()
    const state = {
        value: ""
    }

    const component = render(
        <Wrapper onSubmit={onSubmit} state={state} />
    )

    const input = component.container.querySelector("input")
    const form = component.container.querySelector("form")


    fireEvent.change(input, { target: { value: "this took some time to figure out" } })
    fireEvent.submit(form)

    expect(onSubmit.mock.calls.length).toBe(1)
    expect(state.value).toBe("this took some time to figure out")

})