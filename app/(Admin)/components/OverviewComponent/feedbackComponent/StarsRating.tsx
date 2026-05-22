"use client";

import { useInsertData } from "@/hook/api/useInsertData";
import { useToast } from "@/hook/ui/useToast";
import { Dispatch, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import ToastError from "../../Error/ToastError";

type Profile = {
  id : number ,
  name : string ,
  user_name : string ,
  user_id : string,
}

type props = {
    user_id : string,
    profile : Profile,
}

const StarsRating = ({user_id , profile } : props) => {
    const [rating, setRating] = useState<number>(0);

  const {insertData} = useInsertData();
  const {show , message} = useToast();


  const handleRatingByStars = async () => {
        
        console.log(rating)

        const { error} = await insertData("feedback" , {stars : rating , user_name : profile.user_name , user_id : user_id});

        if(error) {
            console.log("Something went wrong!, when insert Rating");
            show("Something went wrong!");
            return;
        }

        show("Thanks for your feedback!");

  } 
  return (
    <div className="flex gap-2 my-2">
        {message && <ToastError message={message} />}
      {[1, 2, 3, 4, 5].map((stars : number) => {
        return (
          <FaRegStar
            key={stars}
            onClick={() => {setRating(stars); handleRatingByStars()}}
            className={`text-2xl ${stars <= rating ? "text-yellow-400" : "text-gray-500"}  cursor-pointer`}
          />
        );
      })}
    </div>
  );
};

export default StarsRating;
