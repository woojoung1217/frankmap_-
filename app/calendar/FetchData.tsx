import { supabase } from "@/components/supabase";

interface EmotionData {
  post_id: number;
  user_id: number;
  emotion: number;
  date: string;
}

const fetchData = async (): Promise<EmotionData[]> => {
  try {
    const { data, error } = await supabase.from("record").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    console.error("Error fetch data:", error.message);
    return [];
  }
};

export default fetchData;
