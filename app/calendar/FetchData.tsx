import { supabase } from "@/components/supabase";

const fetchData = async (): Promise<any[]> => {
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
