import { Check, LucideIcon, MoveRight, PhoneCall } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PricingProps = {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  button: {
    text: string;
    variant: "outline" | "default";
    icon: LucideIcon;
  };
};

const pricingPlans: PricingProps[] = [
  {
    title: "Startup",
    description:
      "Perfect for small businesses and startups looking for an affordable and reliable solution.",
    price: "$40",
    period: "/ month",
    features: [
      "Fast and reliable performance",
      "Seamless integration",
      "24/7 customer support",
    ],
    button: {
      text: "Sign up today",
      variant: "outline",
      icon: MoveRight,
    },
  },
  {
    title: "Growth",
    description:
      "Designed for growing businesses that need more power and scalability to expand.",
    price: "$80",
    period: "/ month",
    features: [
      "Enhanced security features",
      "Priority support",
      "Advanced analytics dashboard",
    ],
    button: {
      text: "Sign up today",
      variant: "default",
      icon: MoveRight,
    },
  },
  {
    title: "Enterprise",
    description:
      "A comprehensive solution for enterprises requiring custom integrations and dedicated support.",
    price: "$200",
    period: "/ month",
    features: [
      "Dedicated account manager",
      "Custom API access",
      "Unlimited scalability",
    ],
    button: {
      text: "Book a meeting",
      variant: "outline",
      icon: PhoneCall,
    },
  },
];

const Pricing = () => {
  return (
    <section className="w-full py-20 lg:py-40" id="pricing">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              Prices that make sense!
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Get the perfect plan for your business needs, whether you&apos;re
              just starting out or scaling up.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 pt-20 text-left lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="w-full rounded-md shadow-lg">
                <CardHeader>
                  <CardTitle>
                    <span className="flex flex-row items-center gap-4 font-normal">
                      {plan.title}
                    </span>
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col justify-start gap-8">
                    <p className="flex flex-row items-center gap-2 text-xl">
                      <span className="text-4xl">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    </p>
                    <div className="flex flex-col justify-start gap-4">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex flex-row gap-4">
                          <Check className="mt-2 h-4 w-4 text-primary" />
                          <div className="flex flex-col">
                            <p>{feature}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant={plan.button.variant} className="gap-4">
                      {plan.button.text}{" "}
                      <plan.button.icon className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
