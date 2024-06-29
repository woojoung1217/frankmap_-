/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

interface RecordType {
  record_id: number;
  emotion: number;
  content: string;
  latlng: {
    lat: number;
    lng: number;
  };
  date: string;
  location: string;
  image: string[];
  user_id: string;
  created_at: string;
}

interface UserType {
  user_id: string;
  email: string;
  nickname: string;
  created_at: string;
}

interface Latlng {
  lat: number;
  lng: number;
}
