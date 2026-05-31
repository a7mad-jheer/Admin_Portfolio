"use client"
import { LoadingLink } from "@/app/Components/global/LoadingLink";

type props  = {
    username : string;
}
export const PortfolioBtn = ({username} : props) => {
  return (
    <LoadingLink href={`/portfolio/${username}`} posthogText = "View_Profile_Clicked"  >
          <h1 className=" w-fit py-2 px-3 rounded text-white border border-gray-700 text-semibold bg-gradient-to-r from-blue-900 to-teal-800
            hover:from-emerald-800 hover:to-teal-900 ">View Portfolio</h1>
        </LoadingLink>
  )
}

export default PortfolioBtn