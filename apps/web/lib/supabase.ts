import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { serverEnv } from "./env";

// Standard server client (uses anon key + RLS)
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { userId } = await auth();

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as CookieOptions);
            });
          } catch {
            // Server component — cookies may not be mutable
          }
        },
      },
    }
  );

  // Set the current user context for RLS policies
  if (userId) {
    await client.rpc("set_config", {
      setting_name: "app.current_user_id",
      setting_value: userId,
    });
  }

  return client;
}

// Admin client (service role — bypasses RLS — server only)
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
