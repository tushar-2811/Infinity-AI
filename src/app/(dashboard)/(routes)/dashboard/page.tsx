"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Code2Icon, CodeIcon, CodeSquareIcon, FingerprintIcon, ImageIcon, MessageSquare, WalletCardsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools = [
  
   {
       label : "Legal Advisor",
       icon : MessageSquare,
       href : "/conversation",
       color : "text-violet-500",
       bgColor : "bg-violet-500/10"
   },
   {
      label : "Image Generation",
      icon : ImageIcon,
      href : "/image",
      color : "text-pink-700",
      bgColor : "bg-pink-700/10"
  },
  {
   label : "Code Generation",
   icon : Code,
   href : "/code",
   color :  "text-green-500",
   bgColor : "bg-green-500/10"
},
{
   label : "Code Debugger",
   icon : CodeSquareIcon,
   href : "/code-debug",
   color :  "text-blue-500",
   bgColor : "bg-blue-500/10"
},
{
   label : "Pay Now",
   icon : FingerprintIcon,
   href : "/wallet",
   color :  "text-sky-500",
   bgColor : "bg-sky-500/10"
},
   
]

export default function DashboardPage() {
   const router = useRouter();
    return (
       <div>
         <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center" >
               Explore the power of AI
            </h2>

            <p className="text-muted-foreground font-light text-sm md:text-lg text-center ">
               Chat with the smartest AI - Experience the Future
            </p>

         </div>

         <div className="px-4 md:px-20 lg:px-32 space-y-4" >
             
             {
               tools.map((tool) => (
                  <Card 
                  onClick={() => router.push(tool.href) }
                  key={tool.href}
                  className="p-4 border-black/5 flex items-center
                  justify-between hover:shadow-md transition cursor-pointer"
                  >
                     <div className="flex items-center gap-x-4 ">
                        <div className={cn("p-2 w-fit rounded-md" , tool.bgColor)}>
                            <tool.icon className={cn("w-8 h-8" , tool.color)} />
                        </div>

                        <div className="font-semibold">
                           {tool.label}
                        </div>

                     </div>

                     <ArrowRight className="w-5 h-5" />

                  </Card>
               ))
             }

         </div>
       </div>
    );
  }
  