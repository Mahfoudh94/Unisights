import { BookOpen, Rocket, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginButton } from "../auth/login-button";
import { currentUser } from "@/server/auth";
import Link from "next/link";

const Cta = async () => {
  const user = await currentUser();
  return (
    <section className="flex items-center justify-center py-20 md:py-32" id="cta">
      <div className="container">
        <div className="flex w-full flex-col gap-8 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg md:gap-16 lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium">SMART CAMPUS SOLUTION</span>
            </div>
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Transform Your University Experience
            </h3>
            <p className="lg:text-lg">
              Join {user ? "the thousands of students" : "our campus community"} using UniSights to 
              optimize schedules, discover events, and unlock academic insights.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {!user ? (
              <LoginButton asChild>
                <Button 
                  className="gap-2" 
                  size="lg"
                >
                  Get Started <Rocket className="h-4 w-4" />
                </Button>
              </LoginButton>
            ) : (
              <Button className="gap-2" asChild size="lg">
                <Link href="/dashboard">
                  Go to Dashboard <BookOpen className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <Button 
              className="gap-2" 
              variant="secondary" 
              size="lg"
              asChild
            >
              <Link href="/demo">
                See Live Demo <BookOpen className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;