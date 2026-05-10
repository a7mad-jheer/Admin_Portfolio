import AddSocialForm from "../OverviewComponent/socialMediaComponent/AddSocialForm";

export const SocialMediaUrl = () => {

  return (
    <div className="text-center my-5 bg-zinc-900 p-2 rounded-md ">
      <h1 className="p-2 text-2xl font-semibold mb-10 border-b-2 border-gray-700">Social Media Url</h1>

      <AddSocialForm />
    </div>
  );
};

export default SocialMediaUrl;
