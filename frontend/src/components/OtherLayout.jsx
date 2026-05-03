import React from "react";
import { Outlet } from "react-router-dom";

export default function OtherLayout() {
  return (
    <div className="font-outfit min-h-screen bg-gradient-to-br from-[#0a060f] to-[#140e21] text-indigo-50 relative overflow-hidden flex flex-col pt-20 pb-10">
      {/* Universal ambient glowing elements for non-home pages */}
      <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-[#bd5e2b] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[5%] w-[40rem] h-[40rem] bg-[#e87a3e] rounded-full blur-[250px] opacity-[0.08] pointer-events-none"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
