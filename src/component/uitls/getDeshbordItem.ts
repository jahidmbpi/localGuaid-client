import { TRole } from "@/types/role";

import {
  adminSidebarItem,
  guaidSidebarItem,
  turistSidebarItem,
} from "./deshbord/deshbordSidebarItem";

export const role = {
  admin: "ADMIN",
  turist: "TOURIST",
  guaid: "GUIDE",
};

export const getDeshbordSidebarItems = (userRole: TRole) => {
  if (!userRole) return [];
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItem];
    case role.guaid:
      return [...guaidSidebarItem];
    case role.turist:
      return [...turistSidebarItem];

    default:
      return [];
  }
};
