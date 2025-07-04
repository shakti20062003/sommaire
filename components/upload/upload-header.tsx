import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

 export default function UploadHeader() {
 return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
    <div className='relative p-[1px] rounded-full overflow-hidden bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group'>
  <Badge variant={'secondary'}
  className='relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-200 transition-colors '>
    <Sparkles className="w-6 h-6 mr-2 text-rose-600 animate-pulse" />
    <p className='text-base text-rose-500'>AI-Powered Content Creation</p>
  </Badge>
  </div>
  <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
Start Uploading{" "}
<span className="inline-bloc relative">
  <span className="relative z-10 px-2">Your PDF's</span>
  <span
    className="absolute inset-0 -rotate-3 skew-y-1 transform rounded-lg bg-rose-200/50"
    aria-hidden="true"
  ></span>
</span>{" "}
  </div>
  <div className='mt-2 text-lg text-gray-600 leading-8 max-w-2xl textcenter'>
    <p>Upload your PDF and let our AI do the magic! ✨</p>
  </div>
</div>
 )
 }