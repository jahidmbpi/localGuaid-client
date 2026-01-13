export interface IResponse<T> {
  message: string;
  statusCode: number;
  success: boolean;
  data: T;
}

interface guidInfo {
  id: string;
  userId: string;
  expertise: string[];
  dailyRate: number;
}
interface turistInfo {
  id: string;
  userId: string;
  preferences: string[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "TOURIST" | "GUIDE" | "ADMIN";
  bio: string;
  profilePhoto: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCK";
  language: string[];
  credentials: string[];
  guideInfo?: guidInfo;
  touristInfo: turistInfo;
  createdAt: string;
  phone: string;
  presentAddress: string;
  parmanentAddress: string;
}
