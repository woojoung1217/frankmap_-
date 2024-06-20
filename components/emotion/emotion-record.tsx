import { addStepState, emotionState } from "@/atoms/atoms";
import Button from "@/components/button/button";
import "@/components/emotion/emotion-record.scss";
import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface FormTypes {
  emotion: number;
  content: string;
  latlng: {
    lat: number;
    lng: number;
  };
  date: string;
  location: string;
  image: string[];
}

const EmotionRecord = (): JSX.Element => {
  const setAddStep = useSetRecoilState(addStepState);
  const emotion = useRecoilValue(emotionState);
  const [image, setImage] = useState({
    imageFile: "",
    previewURL: "",
  });
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormTypes>();

  function saveImage(e) {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        imageFile: e.target.files[0],
        previewURL: fileReader.result,
      });
    };
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const onSubmit = (formData: FormTypes): void => {
    if (typeof emotion === "number") {
      formData.emotion = emotion;
      console.log(formData);
    }
  };

  const handleBack = () => {
    setAddStep("step1");
  };

  return (
    <div className="emotion-record-container">
      <form onSubmit={handleSubmit(onSubmit)} className="emotion-record-form">
        <div className="emotion-date">
          <img className="emotion-emoji" src={`/emotion${emotion}-folded.svg`} alt={`감정코드: ${emotion}`} />
          <label className="emotion-calendar-label" htmlFor="date">
            <img src="/icon-calendar.svg" alt="날짜 선택" />
          </label>
          <input type="date" id="date" value={selectedDate} {...register("date")} onChange={handleChange} />
        </div>
        <div className="emotion-contents">
          <textarea
            placeholder="오늘 느꼈던 나의 감정은?"
            rows={10}
            {...register("content", {
              required: true,
            })}
          />
          {errors.content && <p>감정을 입력해 주세요!</p>}
        </div>
        <div className="emotion-images">
          <label className="emotion-image-add" htmlFor="image">
            <img src="icon-add.svg" alt="사진 추가" />
            <span>사진 추가</span>
          </label>
          <input type="file" id="image" {...register("images", { onChange: saveImage })} accept=".png, .jpeg, .jpg" />
          <div>{image && <img src={image.previewURL} alt="preview-img" />}</div>
        </div>
        <div className="emotion-record-button">
          <Button handleClick={handleBack}>뒤로가기</Button>
          <Button type="submit" color="secondary">
            기록하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmotionRecord;
