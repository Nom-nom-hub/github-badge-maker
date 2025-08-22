import { BadgeMaker } from '@/components/badge-maker';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <>
      <BadgeMaker />
      <Toaster richColors position="top-right" />
    </>
  );
}
