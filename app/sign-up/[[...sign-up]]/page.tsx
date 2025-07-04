import { SignUp } from '@clerk/nextjs'
import BgGradient from '@/components/common/bg-gradient'
export default function Page() {
  return( 
    <div className='flex justify-center items-center lg:min-h-[40vh]'>
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 lg:pt-12">
            <BgGradient />
            <SignUp />
        </div>
    </div>
  );
}