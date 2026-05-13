import { TRole } from "@/types/role";
import { adminNavItems, guideNavItems, touristNavItems } from "./nav/navItem";

export const role = {
  admin: "ADMIN",
  turist: "TOURIST",
  user: "GUIDE",
};

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminNavItems];
    case role.user:
      return [...guideNavItems];
    case role.turist:
      return [...touristNavItems];

    default:
      return [];
  }
};
