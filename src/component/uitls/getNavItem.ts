import { TRole } from "@/types/role";
import { adminNavItems } from "./adminNavItems";
import { guideNavItems } from "./guideNavItems";
import { touristNavItems } from "./touristNavItems";

export const role = {
  admin: "ADMIN",
  superAdmin: "SUPER_ADMIN",
  user: "USER",
};

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminNavItems];
    case role.user:
      return [...guideNavItems];
    case role.superAdmin:
      return [...touristNavItems];

    default:
      return [];
  }
};
