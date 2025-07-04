import BgGradient from '@/components/common/bg-gradient';
import UploadForm from '@/components/upload/upload-form';
import UploadHeader from '@/components/upload/upload-header';


export default function Page() {
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-32 lg:px-8 lg:py-24">
        <div className='flex flex-col gap-6 items-center justify-center text-center'>
        <UploadHeader />
        <UploadForm />
        </div>
      </div>
    </section>
  );
}
