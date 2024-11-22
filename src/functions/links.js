import { Database } from "bun:sqlite"
import { GetAccount } from "./accounts"

export function createLink(owner, url) {
    const db = LinksDB()
    const account = GetAccount(owner)

    // Checks
    if (!account) { return false }
    if (url.length > 255) { return false }
    if (url.length < 1) { return false }
    if (url.includes(" ")) { return false }
    if (url.includes(";")) { return false }
    if (url.includes("'")) { return false }
    if (url.includes('"')) { return false }
    if (url.includes("`")) { return false }
    if (url.includes("\\")) { return false }

    const create_link = db.query("INSERT INTO links (id, owner, url) VALUES (?, ?, ?)")
    create_link.run(crypto.randomUUID(), owner, url)
}

function LinksDB() {
    const db = new Database("links.sqlite")

    const init_links = db.query("CREATE TABLE IF NOT EXISTS links (id TEXT PRIMARY KEY, owner TEXT, url TEXT)")
    init_links.run()

    return db
}