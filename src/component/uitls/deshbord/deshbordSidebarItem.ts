const BASE = "/dashboard";
export const adminSidebarItem = [
  {
    label: "User Management",
    path: `${BASE}/manageUser`,
  },
  {
    label: "Listing Management",
    path: `${BASE}/managelisting`,
  },

  {
    label: "Booking Management",
    path: `${BASE}/myBooking`,
  },
  {
    label: "Deshboard",
    path: `${BASE}`,
  },
];

export const turistSidebarItem = [
  {
    label: "My Trips (Upcoming/Past)",
    path: `${BASE}/mytrip`,
  },
  {
    label: "Wishlist",
    path: `${BASE}/wishList`,
  },
  {
    label: "My Bookings",
    path: `${BASE}/myBooking`,
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
