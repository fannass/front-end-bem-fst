export interface OrganizationProfile {
  name: string;
  description: string;
  vision: string;
  mission: string[];
  email: string;
  phone: string;
  address: string;
  logo_url: string;
  cabinet_name?: string; // Added for "Kabinet Loyalist Spectra"
  tagline?: string;      // Added for "Inklusif, pengembangan SDM..."
  period_years?: string; // Added for "2025-2026"
  socials: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content
  category: string;
  image_url: string;
  author: string;
  created_at: string;
  views: number;
}

export interface CabinetMember {
  id: number;
  name: string;
  position: string;
  department?: string;
  photo_url: string;
  bio?: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}