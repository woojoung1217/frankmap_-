import "@/components/list/emotion-item.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/components/list/emotion-item.scss";

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

interface EmotionItemProps {
  record: RecordType;
}

const ListItem: React.FC<EmotionItemProps> = ({ record }) => {
  // 날짜 포맷 변경
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  return (
    <div key={record.record_id} className="emotion-card">
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
