
type userType = {
  id : string ,
  email ?: string ,
  name ?: string
} | null

type props = {
    data : userType,
    error :boolean
}

export const OverviewHeader = ({data , error} : props) => {
    return (
        <>
        <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-6 shadow-xl mt-10">
              {/* glow effect */}
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-500/10 blur-3xl"></div>

              {error && (
                <div>Sothing went wrong in Your Informations</div>
              )}
      
              {data && (
                <div className="relative z-10 flex flex-col gap-2">
                  <span className="text-sm uppercase tracking-[0.2em] text-gray-400">
                    Dashboard Overview
                  </span>
      
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                       {data.name ?? "User"}
                    </span>
                  </h1>
      
                  <p className="text-sm text-gray-400">
                    Manage your portfolio, projects, and profile information from
                    here.
                  </p>
                </div>
              )}
            </div>
        </>
    )
}

export default OverviewHeader