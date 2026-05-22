import AddSocialForm from "../OverviewComponent/socialMediaComponent/AddSocialForm";

type socialMediaType = {
  id: number | null;
  user_id: string;
  Gmail: string;
  Facebook: string;
  Whatsapp: string;
  Github: string;
  LinkedIn: string;
};

type props ={ 
  user_id : string;
  onUpdate ?: (data : socialMediaType) => void;
} 

export const SocialMediaUrl = ({user_id , onUpdate} : props) => {

  return (
    <div className="text-center  bg-zinc-900 p-2 rounded-md h-full flex flex-col my-5 ">
      <h1 className="p-2 text-2xl font-semibold mb-10 border-b-2 border-gray-700">Social Media Url</h1>

    <div className="flex-1">
            <AddSocialForm user_id = {user_id}  onUpdate= {onUpdate}/>

    </div>
    </div>
  );
};

export default SocialMediaUrl;
