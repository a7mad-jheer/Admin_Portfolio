import { createSupabaseServer } from "@/lib/supabase-server";

export async function POST(req:Request) {
    const {email , password} = await req.json();

    const supabase = await createSupabaseServer();

    const {data , error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error) {
        return Response.json(
            {error : error.message},
            {status : 401}
        )
    }

    return Response.json(
        {message : "Login successful"},
        {status : 200},
    )
}