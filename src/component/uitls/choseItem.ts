"use client";

import { FastForward, Shield, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const choseUsItem: {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    icon: FastForward,
    title: "Trusted Guides",
    description:
      "Our guides are highly experienced and trusted by thousands of travelers.",
  },
  {
    id: 2,
    icon: Shield,
    title: "Safe & Secure",
    description:
      "We ensure safety and security for all our tours and activities.",
  },
  {
    id: 3,
    icon: Users,
    title: "Personalized Experience",
    description: "Tours and experiences tailored to your interests and needs.",
  },
];
