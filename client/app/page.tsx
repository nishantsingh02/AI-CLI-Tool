
// "use client"
// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";
// import { authClient } from "@/lib/auth-client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const {data, isPending} = authClient.useSession();
//   const router = useRouter()

//   if(isPending) {
//     return <div className="flex flex-col justify-center items-center h-screen">
//       <Spinner />
//     </div>
//   }

//   // check the user is authenticated or not
//   if(!data?.session && !data?.user) {
//     router.push("/sign-in");
//   }
 
//   return (
//    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
//       <div className="w-full max-w-md px-4">
//         <div className="space-y-8">
//           {/* Profile Header Card */}
//           <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 bg-zinc-900/50 backdrop-blur-sm">
//             {/* Avatar */}
//             <div className="flex justify-center mb-6">
//               <div className="relative">
//                 <img
//                   src={data?.user?.image || "/vercel.svg"}
//                   alt={data?.user?.name || "User"}
//                   width={120}
//                   height={120}
//                   className="rounded-full border-2 border-dashed border-zinc-600 object-cover"
//                 />
//                 <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
//               </div>
//             </div>

//             {/* User Info */}
//             <div className="space-y-3 text-center">
//               <h1 className="text-3xl font-bold text-zinc-50 truncate">Welcome, {data?.user?.name || "User"}</h1>
//               <p className="text-sm text-zinc-400">Authenticated User</p>
//             </div>
//           </div>

//           {/* User Details Card */}
//           <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-6 bg-zinc-900/50 backdrop-blur-sm space-y-4">
//             <div className="space-y-2">
//               <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Email Address</p>
//               <p className="text-lg text-zinc-100 font-medium break-all">{data?.user?.email}</p>
//             </div>
//           </div>

//           {/* Sign Out Button */}
//           <Button
//             onClick={() =>
//               authClient.signOut({
//                 fetchOptions: {
//                   onError: (ctx) => console.log(ctx),
//                   onSuccess: () => router.push("/sign-in"),
//                 },
//               })
//             }
//             className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
//           >
//             Sign Out
//           </Button>

//           {/* Decorative divider */}
//           <div className="flex items-center gap-3">
//             <div className="flex-1 h-px border-t border-dashed border-zinc-700"></div>
//             <span className="text-xs text-zinc-600">Session Active</span>
//             <div className="flex-1 h-px border-t border-dashed border-zinc-700"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, Mail, Shield, Sparkles } from "lucide-react";

export default function Home() {
  const {data, isPending} = authClient.useSession();
  const router = useRouter()

  if(isPending) {
    return <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <Spinner />
    </div>
  }

  if(!data?.session && !data?.user) {
    router.push("/sign-in");
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Floating orb effect */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative space-y-6">
          {/* Main Profile Card */}
          <div className="bg-gradient-to-b from-zinc-800/40 to-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 border border-zinc-700/50 shadow-2xl">
            {/* Header Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Verified Account</span>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative">
                  <img
                    src={data?.user?.image || "/vercel.svg"}
                    alt={data?.user?.name || "User"}
                    width={110}
                    height={110}
                    className="rounded-full border-4 border-zinc-800 object-cover shadow-xl"
                  />
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-400 rounded-full border-3 border-zinc-900 shadow-lg animate-pulse"></div>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mt-6 mb-2 tracking-tight">
                {data?.user?.name || "User"}
              </h1>
              <p className="text-zinc-400 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Active Session
              </p>
            </div>

            {/* Info Grid */}
            <div className="space-y-4">
              <div className="bg-zinc-800/50 rounded-2xl p-5 border border-zinc-700/30 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                    <Mail className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-base text-zinc-100 font-medium break-all">{data?.user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onError: (ctx) => console.log(ctx),
                  onSuccess: () => router.push("/sign-in"),
                },
              })
            }
            className="w-full h-12 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-2xl transition-all shadow-lg hover:shadow-red-500/20 flex items-center justify-center gap-2 group"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Sign Out
          </Button>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-zinc-600">
              Secured by end-to-end encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



