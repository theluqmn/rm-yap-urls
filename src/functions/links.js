import { Database } from "bun:sqlite"
import { GetAccount } from "./accounts"

export function CreateLink(owner, url) {
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
    return true
}

export function UpdateLink(id, url) {
    const db = LinksDB()
    const link = GetLink(id)

    // Checks
    if (!link) { return false }
    if (url.length > 255) { return false }
    if (url.length < 1) { return false }
    if (url.includes(" ")) { return false }
    if (url.includes(";")) { return false }
    if (url.includes("'")) { return false }
    if (url.includes('"')) { return false }
    if (url.includes("`")) { return false }
    if (url.includes("\\")) { return false }

    const update_link = db.query("UPDATE links SET url = ? WHERE id = ?")
    update_link.run(url, id)
    return true
}

export function DeleteLink(id) {
    const db = LinksDB()
    const link = GetLink(id)

    // Checks
    if (!link) { return false }
    
    const delete_link = db.query("DELETE FROM links WHERE id = ?")
    delete_link.run(id)
    return true
}

export function GetLink(id) {
    const db = LinksDB()

    const link = db.query("SELECT * FROM links WHERE id = ?")
    link.get(id)

    if (link.length === 0) { return false }
    return link
}

export function GetLinks(owner) {
    const db = LinksDB()

    const links = db.query("SELECT * FROM links WHERE owner = ?")
    links.get(owner)

    return links
}

function LinksDB() {
    const db = new Database("links.sqlite")

    const init_links = db.query("CREATE TABLE IF NOT EXISTS links (id TEXT PRIMARY KEY, owner TEXT, url TEXT)")
    init_links.run()

    return db
}