import { CreateAccount, GetAccount } from "./functions/accounts"
import { CreateLink, UpdateLink, DeleteLink } from "./functions/links"

const app = Bun.serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url)
        const path = url.pathname
        
        // Create Account
        switch (path) {
            case "/create-account":
                const username = url.searchParams.get("username")
                const password = url.searchParams.get("password")
                if (!username || !password) {
                    return new Response("Invalid request", { status: 400 })
                }
                const account = CreateAccount(username, password)
                if (!account) {
                    return new Response("Invalid request", { status: 400 })
                }
                return new Response("Account created", { status: 200 })
            case "/link":
                const owner = url.searchParams.get("owner")
                const linkUrl = url.searchParams.get("url")
                if (!owner || !linkUrl) {
                    return new Response("Invalid request", { status: 400 })
                }
                const createdLink = CreateLink(owner, linkUrl)
                if (!createdLink) {
                    return new Response("Invalid request", { status: 400 })
                }
                return new Response("Link created", { status: 200 })
        }
    }})