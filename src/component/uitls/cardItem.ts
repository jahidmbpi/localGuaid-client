import { CalendarDays, Search, Smile, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const howItWorksData: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: Search,
    title: "Search",
    desc: "Find your perfect destination",
  },
  {
    icon: User,
    title: "Choose Guide",
    desc: "Pick a trusted local guide",
  },
  {
    icon: CalendarDays,
    title: "Book Experience",
    desc: "Schedule your tour easily",
  },
  {
    icon: Smile,
    title: "Enjoy Trip",
    desc: "Have an unforgettable journey",
  },
];
