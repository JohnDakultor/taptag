// export default function Loading({ message = "Loading..." }: { message?: string }) {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <svg
//         className="animate-spin h-8 w-8 text-yellow-400"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//       >
//         <circle
//           className="opacity-25"
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           strokeWidth="4"
//         />
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//         />
//       </svg>
//       <p className="text-yellow-400 font-medium mt-2">{message}</p>
//     </div>
//   );
// }
"use client";

import Image from "next/image";

export default function Loading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {/* Logo fading animation */}
      <div className="w-20 h-20 relative animate-fade-in-out">
        <Image
          src="/images/logo.png" // Make sure your logo is placed in /public
          alt="Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Loading message with pulse effect */}
      <p className="text-yellow-400 font-medium mt-4 animate-pulse">{message}</p>
    </div>
  );
}
