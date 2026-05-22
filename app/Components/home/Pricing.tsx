import Link from "next/link";

const plans = [
  {
    id:0 ,
    title : "Free Trial" ,
    feature : ["- Up to 2 categories" , "- Up to 3 projects per category" ,  "- Public portfolio page" , "- Basic customization" , "- Free hosting with limited performance" ],
    btnText : "Get Free Trial",
    href:"/signup"
  },
  {
    id : 1 ,
    title : "Pro Plan - Comming Soon" ,
    feature : [
      "- Unlimited categories",
      "- Unlimited projects",
      "- Custom domain support",
      "- Advanced portfolio themes",
      "- Analytics & visitors insights",
      "- Priority support"
    ],
    btnText : "Comming Soon",
    href:""
  }

]

export const Pricing = () => {
  return (
    <div className="min-h-screen px-6 flex flex-col justify-center items-center gap-12">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-white text-4xl font-bold">
          Simple pricing for your career growth
        </h1>
        <p className="text-base text-gray-400 font-semibold max-w-md m-auto">
          Try it for Free. If you like it, unlock full access with a simple
          subscription.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((p) => {
          return(
            <div key={p.id} className="relative md:col-span-1  group bg-white/5 border-white/10 border rounded-md  backdrop-blur-xl ">

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(59,130,246,0.3)] transition bg-gradient-to-r from-blue-600/10 to-purple-600/10"/>
        
          <div className="flex flex-col justify-between h-full ">
            <h1 className="text-white text-xl text-center font-semibold border-b border-gray-700 py-3">{p.title}</h1>
           
          <ul className="px-5 py-3 space-y-3 text-gray-400 text-sm h-full">
             {p.feature.map((f , index) =>{
              return (
                <li key={index}>{f}</li>
              )
            })}
          </ul>

          <div className="border-t border-gray-700  text-center h-30 flex items-center justify-center">
            <Link href={p.href} className="font-bold text-white  bg-blue-600 shadow-xl shadow-blue-600/20  py-1 px-3  rounded-full w-fit m-auto my-5 cursor-pointer group-hover:scale-105">{p.btnText}</Link>
          </div>
          </div>
        </div>
          )
        })}
      </div>
    </div>
  );
};

export default Pricing;
