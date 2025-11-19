import {createAuthClient} from "better-auth/react"
import {deviceAuthorizationClient} from "better-auth/plugins"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3001", // backend url
    plugins: [
        deviceAuthorizationClient()
    ]
})