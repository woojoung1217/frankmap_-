import { supabase } from "@/libs/supabase";

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

const fetchData = async (userId: string): Promise<RecordType[]> => {
  try {
    const { data, error } = await supabase.from("record").select("*").eq("user_id", userId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

export default fetchData;
