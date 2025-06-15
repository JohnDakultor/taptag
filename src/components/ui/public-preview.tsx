// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Mail, Phone, MessageSquareText, Link as LinkIcon } from "lucide-react";
// import Loading from "@/components/ui/loading";

// type Props = {
//   userId: string;
// };



// export default function PublicPreview({ userId }: Props) {
//   const [portfolio, setPortfolio] = useState<any>(null);
//   const [links, setLinks] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       const res = await fetch(`/api/public/preview?userId=${userId}`);
//       if (res.ok) {
//         const data = await res.json();
//         setPortfolio(data);
//       }
//     };

//     const fetchLinks = async () => {
//       const res = await fetch(`/api/public/links?userId=${userId}`);
//       if (res.ok) {
//         const data = await res.json();
//         setLinks(data);
//       }
//     };

//     fetchPortfolio();
//     fetchLinks();
//   }, [userId]);

//   const getIcon = (label: string) => {
//     const lower = label.toLowerCase();
//     if (lower.includes("phone") || lower.includes("call")) return <Phone size={16} />;
//     if (lower.includes("email")) return <Mail size={16} />;
//     if (lower.includes("sms") || lower.includes("message")) return <MessageSquareText size={16} />;
//     return <LinkIcon size={16} />;
//   };

//   const getLinkHref = (label: string, value: string) => {
//     const lower = label.toLowerCase();
//     if (lower.includes("phone") || lower.includes("call")) return `tel:${value}`;
//     if (lower.includes("email")) return `mailto:${value}`;
//     if (lower.includes("sms") || lower.includes("message")) return `sms:${value}`;
//     if (value.startsWith("http")) return value;
//     return `https://${value}`;
//   };

//   if (!portfolio) return <Loading message="fetching portfolio..." />;

//    return (
//     <div className="min-h-screen px-4 py-10 sm:px-6 md:px-10">
//       <Card
//         className="max-w-xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl transition-all duration-500"
//         style={{
//           backgroundColor: portfolio.backgroundColor || "#fff",
//           color: portfolio.textColor || "#000",
//           fontFamily: portfolio.font || "inherit",
//         }}
//       >
//         <CardContent
//           className="space-y-6 p-8 flex flex-col"
//           style={{
//             textAlign: portfolio.alignment,
//             alignItems:
//               portfolio.alignment === "left"
//                 ? "flex-start"
//                 : portfolio.alignment === "right"
//                 ? "flex-end"
//                 : "center",
//           }}
//         >
//           {/* Avatar */}
//           {portfolio.avatar && (
//             <img
//               src={portfolio.avatar}
//               alt="Avatar"
//               className="w-24 h-24 rounded-full ring-4 ring-white/20 shadow-md transition-transform hover:scale-105"
//               style={{
//                 margin:
//                   portfolio.alignment === "left"
//                     ? "0"
//                     : portfolio.alignment === "right"
//                     ? "0 0 0 auto"
//                     : "0 auto",
//               }}
//             />
//           )}

//           {/* Name */}
//           <h1 className="text-3xl font-extrabold tracking-tight">{portfolio.name}</h1>

//           {/* Icons (email/phone) */}
//           <div
//             className={`flex gap-4 ${
//               portfolio.alignment === "left"
//                 ? "justify-start"
//                 : portfolio.alignment === "right"
//                 ? "justify-end"
//                 : "justify-center"
//             }`}
//           >
//             {links.map((link) => {
//               const label = link.label.toLowerCase();
//               const href = getLinkHref(link.label, link.value);

//               if (label.includes("phone") || label.includes("call")) {
//                 return (
//                   <a
//                     key={link.id}
//                     href={href}
//                     className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-inherit shadow-sm"
//                   >
//                     <Phone size={15} />
//                   </a>
//                 );
//               }

//               if (label.includes("email")) {
//                 return (
//                   <a
//                     key={link.id}
//                     href={href}
//                     className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-inherit shadow-sm"
//                   >
//                     <Mail size={15} />
//                   </a>
//                 );
//               }

//               return null;
//             })}
//           </div>

//           {/* Title & Bio */}
//           <h2 className="text-xl font-semibold">{portfolio.title}</h2>
//           <p className="leading-relaxed">{portfolio.bio}</p>

//           {/* Contact Section */}
//           {portfolio.showContact && links.length > 0 && (
//             <div className="w-full space-y-3" style={{ textAlign: portfolio.alignment }}>
//               <h3 className="text-lg font-semibold">Contact</h3>
//               <ul className="space-y-2 text-sm">
//                 {links
//                   .filter((link) => link.type === "contact" || link.type === "social")
//                   .map((link) => (
//                     <li
//                       key={link.id}
//                       className={`inline-flex items-center gap-2 w-full ${
//                         portfolio.alignment === "left"
//                           ? "justify-start"
//                           : portfolio.alignment === "right"
//                           ? "justify-end"
//                           : "justify-center"
//                       }`}
//                     >
//                       {getIcon(link.label)}
//                       <a
//                         href={getLinkHref(link.label, link.value)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="underline hover:opacity-80 transition"
//                       >
//                         <strong>{link.label}:</strong> {link.value}
//                       </a>
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}

//           {/* Section Blocks */}
//           {portfolio.skills && (
//             <SectionBlock title="Skills" content={portfolio.skills} />
//           )}
//           {portfolio.experience && (
//             <SectionBlock title="Experience" content={portfolio.experience} />
//           )}
//           {portfolio.education && (
//             <SectionBlock title="Education" content={portfolio.education} />
//           )}
//           {portfolio.projects && (
//             <SectionBlock title="Projects" content={portfolio.projects} />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// function SectionBlock({ title, content }: { title: string; content: string }) {
//   return (
//     <div className="w-full p-4 bg-white/10 rounded-xl shadow-sm backdrop-blur-sm transition-all">
//       <h3 className="text-base font-semibold mb-2">{title}</h3>
//       <p className="text-sm leading-relaxed">{content}</p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MessageSquareText, Link as LinkIcon } from "lucide-react";
import Loading from "@/components/ui/loading";

type Props = {
  userId: string;
};

export default function PublicPreview({ userId }: Props) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const res = await fetch(`/api/public/preview?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
      }
    };

    const fetchLinks = async () => {
      const res = await fetch(`/api/public/links?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    };

    fetchPortfolio();
    fetchLinks();
  }, [userId]);

  const getIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes("phone") || lower.includes("call")) return <Phone size={16} />;
    if (lower.includes("email")) return <Mail size={16} />;
    if (lower.includes("sms") || lower.includes("message")) return <MessageSquareText size={16} />;
    return <LinkIcon size={16} />;
  };

  const getLinkHref = (label: string, value: string) => {
    const lower = label.toLowerCase();
    if (lower.includes("phone") || lower.includes("call")) return `tel:${value}`;
    if (lower.includes("email")) return `mailto:${value}`;
    if (lower.includes("sms") || lower.includes("message")) return `sms:${value}`;
    if (value.startsWith("http")) return value;
    return `https://${value}`;
  };

  if (!portfolio) return <Loading message="fetching portfolio..." />;

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 md:px-10">
      <Card
        className="max-w-xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl transition-all duration-500"
        style={{
          backgroundColor: portfolio.backgroundColor || "#fff",
          color: portfolio.textColor || "#000",
          fontFamily: portfolio.font || "inherit",
        }}
      >
        <CardContent
          className="space-y-6 p-8 flex flex-col min-w-0 overflow-hidden"
          style={{
            textAlign: portfolio.alignment,
            alignItems:
              portfolio.alignment === "left"
                ? "flex-start"
                : portfolio.alignment === "right"
                ? "flex-end"
                : "center",
          }}
        >
          {/* Avatar */}
          {portfolio.avatar && (
            <img
              src={portfolio.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full ring-4 ring-white/20 shadow-md transition-transform hover:scale-105"
              style={{
                margin:
                  portfolio.alignment === "left"
                    ? "0"
                    : portfolio.alignment === "right"
                    ? "0 0 0 auto"
                    : "0 auto",
              }}
            />
          )}

          {/* Name */}
          <h1 className="text-3xl font-extrabold tracking-tight break-words text-balance">
            {portfolio.name}
          </h1>

          {/* Icons (email/phone) */}
          <div
            className={`flex gap-4 flex-wrap ${
              portfolio.alignment === "left"
                ? "justify-start"
                : portfolio.alignment === "right"
                ? "justify-end"
                : "justify-center"
            }`}
          >
            {links.map((link) => {
              const label = link.label.toLowerCase();
              const href = getLinkHref(link.label, link.value);

              if (label.includes("phone") || label.includes("call")) {
                return (
                  <a
                    key={link.id}
                    href={href}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-inherit shadow-sm"
                  >
                    <Phone size={15} />
                  </a>
                );
              }

              if (label.includes("email")) {
                return (
                  <a
                    key={link.id}
                    href={href}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-inherit shadow-sm"
                  >
                    <Mail size={15} />
                  </a>
                );
              }

              return null;
            })}
          </div>

          {/* Title & Bio */}
          <h2 className="text-xl font-semibold break-words">{portfolio.title}</h2>
          <p className="leading-relaxed break-words whitespace-pre-wrap">{portfolio.bio}</p>

          {/* Contact Section */}
          {portfolio.showContact && links.length > 0 && (
            <div className="w-full space-y-3" style={{ textAlign: portfolio.alignment }}>
              <h3 className="text-lg font-semibold break-words">Contact</h3>
              <ul className="space-y-2 text-sm">
                {links
                  .filter((link) => link.type === "contact" || link.type === "social")
                  .map((link) => (
                    <li
                      key={link.id}
                      className={`inline-flex items-center gap-2 w-full ${
                        portfolio.alignment === "left"
                          ? "justify-start"
                          : portfolio.alignment === "right"
                          ? "justify-end"
                          : "justify-center"
                      }`}
                    >
                      {getIcon(link.label)}
                      <a
                        href={getLinkHref(link.label, link.value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80 transition break-words"
                      >
                        <strong>{link.label}:</strong> {link.value}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Section Blocks */}
          {portfolio.skills && (
            <SectionBlock title="Skills" content={portfolio.skills} />
          )}
          {portfolio.experience && (
            <SectionBlock title="Experience" content={portfolio.experience} />
          )}
          {portfolio.education && (
            <SectionBlock title="Education" content={portfolio.education} />
          )}
          {portfolio.projects && (
            <SectionBlock title="Projects" content={portfolio.projects} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SectionBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="w-full p-4 bg-white/10 rounded-xl shadow-sm backdrop-blur-sm transition-all overflow-hidden">
      <h3 className="text-base font-semibold mb-2 break-words">{title}</h3>
      <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{content}</p>
    </div>
  );
}
