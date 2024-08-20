export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgID: string;
  datePosted: Date;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: null;
  perksAndBenefits: null;
  createdAt: Date;
  updatedAt: Date;
  orgPrimaryPhone: string;
  orgEmail: string;
  average_rating: number;
  total_reviews: number;
}

export interface initStateInterface {
  jobs: Job[];
  loading: boolean;
  error: string;
  curJob: null | Job;
}

export interface dataComing {
  success?: string;
  message?: string;
  count?: number;
  error?: string;
  data: Job[];
}
export interface singleDataComing {
  success?: string;
  message?: string;
  count?: number;
  error?: string;
  data: Job;
}

export interface BookMarkComing {
  success: boolean;
  message: string;
  data: bookMarkData[] | null;
  errors: string | null;
  count: number;
}

export interface bookMarkData {
  eventID: string;
  title: string;
  opType: string;
  orgName: string;
  datePosted: Date;
  dateBookmarked: Date;
  logoUrl: string;
  location: string;
}
