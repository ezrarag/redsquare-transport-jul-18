import { createClient } from "@supabase/supabase-js"

console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Use placeholder values for development if environment variables are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_service_key"

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
