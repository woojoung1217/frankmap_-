export interface RecordType {
  record_id: number;
  post_id: number;
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

export interface UserType {
  user_id: string;
  email: string;
  nickname: string;
  created_at: string;
}

export interface Latlng {
  lat: number;
  lng: number;
}
