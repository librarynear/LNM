import HeroSection from "@/components/home/herosection";
import FeaturedLibraries from "@/components/shared/featured-libraries";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
   <div className="flex min-h-screen flex-col ">
      <HeroSection/>
      <FeaturedLibraries/>
   </div>
  );
}
