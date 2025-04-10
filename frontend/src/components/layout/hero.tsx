import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const Hero = async () => {
  return (
    <section className="mt-16 w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="outline">Beta Now Available!</Badge>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-regular max-w-lg text-left text-4xl tracking-tighter md:text-6xl">
                Your Smart Campus Companion
              </h1>
              <p className="max-w-md text-left text-xl leading-relaxed tracking-tight text-muted-foreground">
                UniSights unifies course schedules, events, and campus services
                with AI-powered insights to optimize your university experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="group" asChild size="lg">
                <Link rel="noopener noreferrer" href="/dashboard">
                  <span className="flex items-center">
                    Launch Dashboard
                    <ChevronRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button className="group" asChild variant="outline" size="lg">
                <Link rel="noopener noreferrer" href="/demo">
                  <span className="flex items-center">
                    See Demo
                    <BookOpen className="ml-2" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src="/vs-of-results.png"
            alt="Visualization"
            width={673}
            height={495}
            className="rounded-md border"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
