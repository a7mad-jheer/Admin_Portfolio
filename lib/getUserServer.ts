import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr";

export const getUserServer = async () => {
    const cookiesStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            cookies: {
                getAll: () => cookiesStore.getAll(),
                setAll: () => {}
            },
        }
    )

    const {data} = await supabase.auth.getUser();

    return data?.user ?? null
}