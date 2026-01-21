import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-[#f9f9f9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-10">
          
          {/* Left Content: Text and CTA */}
          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
              আপনার শিশুকে দিন একটি সুন্দর ভবিষ্যৎ
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8">
              Buy Every toy with up to <span className="font-bold text-orange-500">35% Discount!</span>
            </p>
            
            <Link 
              href="/shop" 
              className="inline-block px-8 py-3 border-2 border-orange-500 text-orange-500 font-bold rounded-md hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              এখনই কিনুন
            </Link>
          </div>

          {/* Right Content: Image */}
          <div className="flex-1 relative w-full flex justify-center md:justify-end">
            <div className="relative w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] md:w-[500px] md:h-[350px]">
              <Image
                src="/assets/hero.png" // Apnar image path-ti ekhane din
                alt="Kids playing with toys"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
      
      {/* Background Decoration (Optional) */}
      <div className="absolute top-0 right-0 -z-0 opacity-10">
        <svg width="400" height="400" fill="none" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="200" fill="#fb923c" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;