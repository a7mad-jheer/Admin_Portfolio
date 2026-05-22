"use client";


import { useEffect, useState } from "react";

type activityType = {
  id: number;
  table_name: string;
  action: string;
  message : string;
  created_at: string;
};

type props = {
  activitySupabase : activityType[] | []
}

const NoData : activityType[]= [
  {id : 0 , table_name : "No activities" , action : "No actions yet" , message : "There is no activity to display" , created_at : "0/0/000"}
]

export const LatestActivity = ({activitySupabase} : props) => {
  const [activity , setActivity] = useState<activityType[]>(activitySupabase);

  useEffect(() => {
    setActivity(activitySupabase)
  },[activitySupabase])

  const data = activity.length <= 0 ? NoData : activity

  return (
    <div className="relative h-full">
      <h1 className="text-xl my-5 font-semibold">Latest Activity</h1>

      <table className="text-white bg-[hsl(0_0%_10.98%)] border-gray-800 border p-2 border-collapse w-full mt-5 rounded-md">
        <thead>
          <tr>
            <th className="border border-gray-800  p-2">#</th>
            <th className="border border-gray-800  p-2">Name</th>
            <th className="border border-gray-800  p-2">Actions</th>
            <th className="border border-gray-800  p-2">Messages</th>
            <th className="border border-gray-800  p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {data && data
          .map((act, index) => {
            const date = new Date(act.created_at).toLocaleString();
            return (
              <tr key={act.id}>
                <td className="border border-gray-800  p-2 text-center ">
                  {index + 1}
                </td>
                <td className="border border-gray-800  p-2 font-semibold text-center">
                  {act.table_name}
                </td>
                <td className="border border-gray-800  p-2 font-semibold text-center">
                  {act.action}
                </td>
                <td className="border border-gray-800  p-2 font-semibold text-center">
                  {act.message}
                </td>
                <td className="border border-gray-800  p-2 font-semibold text-center">
                  {date}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

