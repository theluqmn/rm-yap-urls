import { Database } from "bun:sqlite"

export function createLink(url) {

}

function LinksDB() {
    const db = new Database("links.sqlite")

    const init_links = db.query("CREATE TABLE IF NOT EXISTS links (id TEXT PRIMARY KEY, owner TEXT, url TEXT)")
    init_links.run()

    return db
}