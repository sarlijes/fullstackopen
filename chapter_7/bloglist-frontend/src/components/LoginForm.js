import React from "react"
import { Button, Input } from "./StyledComponents"

const LoginForm = ({ handleLogin, username, password }) => (
    <form onSubmit={handleLogin}>
        <div>username
            <Input {...username} />
        </div>
        <div>password
            <Input {...password} />
        </div>
        <Button type="submit" className="login">login</Button>
    </form>
)

export default LoginForm