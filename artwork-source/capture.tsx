'use client';
import dynamic from 'next/dynamic';
import {useState} from 'react';
import '@/components/sleepy-world.css';
const Scene=dynamic(()=>import('@/components/sleepy-world-scene'),{ssr:false});
export function ReadmeCapture({night,motion}:{night:boolean;motion:boolean}){
 const [ready,setReady]=useState(false);
 return <div className={`readme-art ${night?'moon':''}`} data-ready={ready}>
  <style>{`
   nextjs-portal{display:none!important}
   .readme-art{height:100svh;width:100%;overflow:hidden;position:relative;background:#e9ece4;color:#30443d;--accent:#97614a;font-family:var(--font-geist-sans),sans-serif;isolation:isolate}
   .readme-art.moon{background:#172b32;color:#e8e9d9;--accent:#e5b39a}
   .readme-art .art-scene{position:absolute;left:29%;right:-5%;top:-4%;bottom:-3%}
   .art-brand{position:absolute;top:7%;left:5%;font-size:25px;letter-spacing:-1px;font-weight:600}
   .art-edition{position:absolute;right:5%;top:8%;font:11px var(--font-geist-mono);letter-spacing:2px;opacity:.6}
   .art-copy{position:absolute;left:5%;top:27%;width:40%;z-index:2}
   .art-copy p{font:11px var(--font-geist-mono);letter-spacing:1.7px;color:var(--accent);margin-bottom:28px}
   .art-copy h1{font-size:62px;line-height:1.05;letter-spacing:-3.5px;font-weight:400}
   .art-copy em{font-family:Georgia,serif;color:var(--accent);font-weight:400}
   .art-copy .art-description{font:16px/1.8 var(--font-geist-sans);letter-spacing:0;max-width:300px;color:inherit;opacity:.75;margin-top:28px}
   .art-watermark{position:absolute;top:13%;left:37%;font-size:120px;letter-spacing:-8px;font-weight:600;opacity:.055}
   .art-footer{position:absolute;left:5%;right:5%;bottom:7%;display:flex;justify-content:space-between;border-top:1px solid #87968b44;padding-top:22px;font:11px var(--font-geist-mono);letter-spacing:1.5px;opacity:.65}
   .art-loading{position:absolute;right:25%;top:45%}
  `}</style>
  <div className="art-brand">sleepyleo</div><div className="art-edition">THE GITHUB EDITION / 01</div>
  <div className="art-watermark" aria-hidden="true">SLEEPYLEO</div>
  <div className="art-scene"><Scene destination="home" night={night} paused={!motion} resetKey={0} onReady={()=>setReady(true)} onError={()=>setReady(true)} onSelect={()=>{}} /></div>
  <div className="art-copy"><p>A SMALL WORLD. A CURIOUS MIND.</p><h1>Somewhere<br/><em>between</em><br/>dream &amp; code.</h1><p className="art-description">Fullstack developer.<br/>Curious mind.<br/>Builder of little worlds.</p></div>
  <div className="art-footer"><span>CODE WITH CARE. MAKE ROOM TO DAYDREAM.</span><span>SLEEPYLEO.COM ↗</span></div>
  {!ready&&<span className="art-loading" role="status">Rendering island…</span>}
 </div>
}
