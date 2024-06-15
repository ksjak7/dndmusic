import { sql } from "@vercel/postgres";
import { randomBytes } from "crypto";

export function generateRandomString(length: number): string {
  return randomBytes(length).toString('hex')
}

export function objectToQueryString(object: Object): string {
  if (Object.keys(object).length < 1)
    return ""
  const keys = Object.keys(object)
  const values = Object.values(object)
  const queries = []
  for (let i = 0; i < keys.length; i++) {
    queries.push(`${keys[i]}=${values[i]}`)
  }
  return queries.join("&")
}