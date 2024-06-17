import React from "react";

import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <section className=" w-screen min-h-screen">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
         <Outlet />
        </div>
        <div class="h-full w- p-7">
          <img
            class="mx-auto h-full w-full rounded-md object-cover"
            src="https://c1.wallpaperflare.com/preview/79/806/473/book-business-drawing-education.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Layout;
