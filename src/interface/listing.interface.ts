export interface PopularListing {
  id: string;
  title: string;
  description: string;
  itinerary: string;
  city: string;
  category: string;
  price: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  images: string[];
  isActive: boolean;
  guideId: string;
  bookingCount: number;
  createdAt: string;
  updatedAt: string;
}
