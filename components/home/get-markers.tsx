import { supabase } from "../supabase";

export type Pin = {
  emotion: number;
  content: string;
  gps: {
    lat: number;
    lng: number;
  };
  date: string;
  location: string;
  image: string;
  created_at: string;
};

const getMarkers = async (): Promise<Pin[]> => {
  const { data } = await supabase.from("post").select("*");
  if (!data) return [];
  return data;
};

export default getMarkers;
