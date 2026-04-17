import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DB_DIR = process.env.SQLITE_DIR || path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "leads.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;
  fs.mkdirSync(DB_DIR, { recursive: true });
  const conn = new Database(DB_PATH);
  conn.pragma("journal_mode = WAL");
  conn.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      form_type TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      company TEXT,
      subject TEXT,
      message TEXT,
      raw TEXT
    );
    CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
  `);
  db = conn;
  return conn;
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  formType?: string;
  raw?: unknown;
}

export function insertLead(lead: LeadInput): number {
  const conn = getDb();
  const result = conn
    .prepare(
      `INSERT INTO leads (form_type, name, email, phone, company, subject, message, raw)
       VALUES (@formType, @name, @email, @phone, @company, @subject, @message, @raw)`
    )
    .run({
      formType: lead.formType || "contact",
      name: lead.name,
      email: lead.email,
      phone: lead.phone || null,
      company: lead.company || null,
      subject: lead.subject || null,
      message: lead.message,
      raw: lead.raw ? JSON.stringify(lead.raw) : null,
    });
  return Number(result.lastInsertRowid);
}

export function listLeads(limit = 100) {
  const conn = getDb();
  return conn
    .prepare(
      `SELECT id, created_at, form_type, name, email, phone, company, subject, message
       FROM leads ORDER BY id DESC LIMIT ?`
    )
    .all(limit);
}

export function getDbPath() {
  return DB_PATH;
}
