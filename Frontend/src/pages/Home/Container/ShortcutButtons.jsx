import React from 'react'

const ShortcutButtons = () => {
   return (
     <section className="flex flex-col container mx-auto px-5 py-10">
       <div className="flex justify-center space-x-4 my-4">
         <div className="w-full max-w-xs bg-green-100 text-green-700 font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center text-sm sm:text-base">
           Sepete En Çok Eklenenler
         </div>
         <div className="w-full max-w-xs bg-orange-100 text-orange-700 font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center text-sm sm:text-base">
           En Çok Öne Çıkanlar
         </div>
         <div className="w-full max-w-xs bg-pink-100 text-pink-700 font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center text-sm sm:text-base">
           Flaş Ürünler
         </div>
       </div>
     </section>
   );
}

export default ShortcutButtons
