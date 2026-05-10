import Link from "next/link";

export const CTA = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 ">
         
         <div className="relative text-center space-y-6 gap-6 max-w-2xl">
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl"/>
               <h1 className="text-white text-4xl font-bold">Ready to build your SaaS?</h1>

               <p className="text-base text-gray-400 font-semibold ">Start building your website in 5 minutes with power full tools, modren design and scalable architecture.</p>

            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-2xl shadow-blue-600 trasnition duration-150 hover:scale-105  hover:cursor-pointer font-bold">Get Start</Link>
         </div>

        </div>
    )
}

export default CTA;