const BASE = "/dashboard";
export const adminSidebarItem = [
  {
    label: "User Management",
    path: "/exploreTour",
  },
  {
    label: "Listing Management",
    path: "/managelisting",
  },

  {
    label: "Booking Management",
    path: "/register",
  },
];

export const turistSidebarItem = [
  {
    label: "My Trips (Upcoming/Past)",
    path: "/exploreTour",
  },
  {
    label: "Wishlist",
    path: "/become-guide",
  },
];

export const guaidSidebarItem = [
  {
    label: "Upcoming bookings",
    path: `${BASE}/upcomeingBooking`,
  },
  {
    label: "Pending requests",
    path: `${BASE}/pendingRequest`,
  },

  {
    label: "My Listings",
    path: `${BASE}/mylisting`,
  },
];
