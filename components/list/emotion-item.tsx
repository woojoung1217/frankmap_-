import "@/components/list/emotion-item.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/components/list/emotion-item.scss";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabase";
import { useModal } from "@/hooks/useModal";

interface EmotionItemProps {
  record: RecordType;
  fetchRecords: () => Promise<void>; // 타입 정의 추가
}

const ListItem: React.FC<EmotionItemProps> = ({ record, fetchRecords }) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  // 날짜 포맷 변경
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  const deleteRecord = async (id: number) => {
    try {
      const { error } = await supabase.from("record").delete().eq("record_id", id);

      if (error) {
        console.log(error);
      }

      console.log("삭제 완료");
      fetchRecords();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div key={record.record_id} className="emotion-card">
      <div className="emotion-card-button-container">
        <button
          type="button"
          onClick={() => {
            console.log(record.record_id);
            router.push(`/emotion/${record.record_id}/edit`);
          }}
        >
          <i className="hidden">편집</i>
          <img src="/icon-edit.svg" alt="편집" />
        </button>
        <button
          type="button"
          onClick={() => {
            openModal({
              title: "감정 삭제",
              content: "정말 삭제하시겠습니까?",
              button: "삭제",
              callBack: () => {
                deleteRecord(record.record_id);
                closeModal();
              },
            });
          }}
        >
          <i className="hidden">삭제</i>
          <img src="/icon-trash.svg" alt="삭제" />
        </button>
      </div>

      <img src={`/emotion${record.emotion}.svg`} alt="record.emotion" className="card-emotion" />
      <div className="emotion-date">{formatDate(record.date)}</div>
      <div className="emotion-location">{record.location}</div>
      {record.image && (
        <div>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={false}
            autoplay={false}
            loop={true}
            className="swiper-container"
          >
            {record.image.map((image, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <img key={index} src={`${image}`} alt={`${record.content} 이미지`} className="card-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="emotion-content">{record.content}</div>
    </div>
  );
};

export default ListItem;
