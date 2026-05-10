
import TitlePanel from "../Global/TitlePanel";
import Image from "next/image";
import { createSupabaseServer } from "@/lib/supabase-server";
export const  ProjectComponent = async () => {
  /*api operation */
  /*api operation */
  const supabase = await  createSupabaseServer();
  const {data : {session} } = await supabase.auth.getSession();
  
 
    const user_id = session?.user.id;


  const [categoriesResult , projectsResult] = await Promise.all([
    supabase.from("categories").select("*").eq("user_id" , user_id),
    supabase.from("projects").select("*").eq("user_id" , user_id),
  ])

  const {data : categoriesData , error : categoryError} = categoriesResult;
  const {data : projectsData , error : projectsError} = projectsResult;

  if(categoryError) return <p>Error when fetch Category</p>
  if(projectsError) return <p>Error when fetch Category</p>

  console.log(categoriesData);
  console.log(projectsData);

  return (
    <div className="p-5">
      {/* Title Panel */}
      <div className="mb-5">
        <TitlePanel title="All Project" />
      </div>

      {/*  */}
      <div>
        {categoriesData.map((cat) => {
          return (
            <div key={cat.id}>
              <h1 className="w-full text-center font-semibold text-xl border-2 border-gray-400 bg-gray-700 text-white rounded-md my-5 py-3">
                {cat.name}
              </h1>

              <div className="flex flex-col sm:flex-row flex-wrap gap-5">
                {projectsData
                  .filter((project) => project.categoryName === cat.name)
                  .map((proj) => {
                    return (
                      <div
                        key={proj.id}
                        className="bg-gray-500 rounded-xl overflow-hidden  sm:max-w-full shadow-2xl flex-1"
                      >
                        <div className="relative w-full h-80">
                          {proj.image && (
                            <Image
                              alt=""
                              src={proj.image}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="p-3 ">
                          <h1 className="text-2xl font-bold text-gray-200">
                            {proj.name}
                          </h1>
                          <p className="text-gray-300">{proj.description}</p>
                          <hr className="my-5 text-gray-800" />
                          <button className="py-2 px-5 bg-gray-900 text-white  mb-3 rounded-xl">
                            Visit Now
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectComponent;

