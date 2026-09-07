import { ReadmeCapture } from './capture';
export default async function Page({searchParams}:{searchParams:Promise<{night?:string;motion?:string}>}) {
  const params=await searchParams;
  return <ReadmeCapture night={params.night==='1'} motion={params.motion==='1'} />;
}
