"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
   <div className="flex flex-col justify-center items-center">
   <nav className='bg-[#001C17] h-11 w-full flex items-center justify-between'>
    <div><Image src="/logo.svg" width="80" height="80" alt="logo"/></div>
    <div>
  <Link href="/login" className="text-md text-[#D7B45A]">Login</Link>
  <Link href="/register" className="mx-5 text-md text-[#D7B45A]">Register</Link>
</div>
   </nav>
   <div className=" h-96 mt-10 grid grid-cols-2  mx-5">
 <div className="hero-content flex flex-col items-center mt-11">
   <h1 className="font-playfair text-center text-2xl text-[#D7B45A] ">Exquisite Flavors, Unforgettable Moments</h1>
   <div className="border-yellow-700 border w-2/3"></div>
   <p className="font-playfair mt-2 text-lg text-gray-300 tracking-wide text-center p-6 ">Secure your table and immerse yourself  in a world of exquisite flavors and timeless elegance.</p>
   <button className="btn mt-3 h-11 w-40 bg-[url('/gold.jpeg')] bg-cover bg-center text-[#001C17] font-semibold border-black border-2" 
    onClick={handleClick}
   >Book Now</button>
 </div>
 <div className="hero-img ml-20 ">
  <Image src="/hero-img.png" width="470" height="250" alt="home-bg"/>
 </div>
   </div>
   </div>
  );
}
