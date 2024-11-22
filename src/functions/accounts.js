import { Database } from "bun:sqlite"

export function CreateAccount(username, password) {
    const db = AccountsDB()

    const create_account = db.query("INSERT INTO accounts (id, username, password) VALUES (?, ?, ?)")
    create_account.run(crypto.randomUUID(), username, password)

    return true
}

export function GetAccount(username) {
    const db = AccountsDB()

    const account = db.query("SELECT * FROM accounts WHERE username = ?")
    account.get(username)

    if (account.length === 0) { return false } else { return account }
}

function AccountsDB() {
    const db = new Database("accounts.sqlite")

    const init_accounts = db.query("CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, username TEXT, password TEXT)")
    init_accounts.run()

    return db
}