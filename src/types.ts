export type UserType = {
  id: number;
  name: string;
  email?: string;
  companyName?: string;
  image: string | null;
};

export type GatheringType = {
  teamId?: string;
  id: number;
  type: "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
  name: string;
  title: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  image: string;
  capacity: number;
  createdBy: number;
  canceledAt: string;
};

export type ReviewQuery = {
  gatheringId?: string;
  userId?: number;
  type?: "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION" | "DALLAEMFIT";
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: "createdAt" | "score" | "participantCount";
  sortOrder?: "asc" | "desc";
  limit?: number | string;
  offset?: number | string;
};

export type ReviewResponse = {
  teamId?: string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: GatheringType;
  User: UserType;
};

export type ReviewsResponse = {
  data: ReviewResponse[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};

export type FiltersType = {
  location?: string;
  date?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
