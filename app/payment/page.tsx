"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

/*
(2) [{…}, {…}]
0
: 
{
id: 1, created_at: '2026-03-29T15:56:21.865482+00:00', name: 'ahmed', email: 'aliali@gmail.com', trialEndsAt: '2026-03-29T16:56:20.86+00:00', …}
1: {id: 2, created_at: '2026-03-31T09:16:33.194272+00:00', name: 'amal', email: 'amal@gmail.com', trialEndsAt: '2026-03-31T10:16:34.626+00:00', …}
length: 2
*/

type profileData = {
    id : boolean | null,
    created_at : string | null,
    name : string | null,
    email : string | null,
    trialEndsAt : string | null,
    isSubscribed : boolean | null,
    user_id : string | null,
}

export default function Payment () { 
    const [profile , setProfile] = useState<profileData[]>([])   

    useEffect(() => {
        console.log(profile)
    }, [profile])

    
    useEffect(() => {
        const fetchData = async () => {
            const {error , data} = await supabase
            .from("profile")
            .select("*")

            if(error) {
                console.log(error)
                return
            }


            setProfile(data || null)
        }

        fetchData()
    },[])

    
    
    return (
        <div>
            You Must paid
        </div>

    )
}