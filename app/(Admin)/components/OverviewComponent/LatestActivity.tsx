"use client";

import { useUser } from "@/Context/UserInfoContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
type activityType = {
  id: number;
  activity: string;
  value: string;
  created_at: string;
};
export const LatestActivity = () => {
  const [activity, setActivity] = useState<activityType[]>([]);

  const { userInfo } = useUser();

  /* api operations */
  /* api operations */

  useEffect(() => {
    const fetchActivity = async () => {
      if (!userInfo?.user_id) {
        console.log("there user_id is null => ", userInfo?.user_id);
        return;
      }

      const { data, error } = await supabase
        .from("latest_activity")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)
        .eq("user_id", userInfo.user_id)
        .single();
      if (error) {
        console.log("there is error when fetch data", error);
        return;
      }

      console.log(data);
      const newDate = new Date(data.created_at);
      setActivity((prev) => [
        ...prev,
        {
          id: data.id,
          created_at: `${newDate}`,
          activity: data.activity,
          value: data.value,
        },
      ]);
    };
    fetchActivity();
  }, [userInfo]);

  return (
    <div>
      <h1 className="text-xl my-5 font-semibold">Latest Activity</h1>

      <table className="text-white bg-[hsl(0_0%_10.98%)] border-gray-800 border p-2 border-collapse w-full mt-5">
        <thead>
          <tr>
            <th className="border border-gray-800  p-2">#</th>
            <th className="border border-gray-800  p-2">Activity</th>
            <th className="border border-gray-800  p-2">Type</th>
            <th className="border border-gray-800  p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {activity.map((act, index) => {
            return (
              <tr key={act.id}>
                <td className="border border-gray-800  p-2 text-center ">
                  {index + 1}
                </td>
                <td className="border border-gray-800  p-2 font-semibold text-center">
                  {act.activity}
                </td>
                <td className="border border-gray-800  p-2 font-semibold text-center">
                  {act.value}
                </td>
                <td className="border border-gray-800  p-2 font-semibold text-center">
                  {act.created_at}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LatestActivity;
