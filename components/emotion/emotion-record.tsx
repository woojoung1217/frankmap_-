import { addModeState, addStepState, emotionState } from "@/atoms/atoms";
import Button from "@/components/button/button";
import "@/components/emotion/emotion-record.scss";
import { supabase } from "@/libs/supabase";
import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

interface FormTypes {
  user_id: string;
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
  const setAddMode = useSetRecoilState(addModeState);
  const setAddStep = useSetRecoilState(addStepState);
  const emotion = useRecoilValue(emotionState);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>();
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleAddImages = async (file: File) => {
    try {
      const newFileName = uuidv4();
      const { data, error } = await supabase.storage.from("images").upload(`${newFileName}`, file);

      if (error) {
        console.log("파일 업로드에 실패했습니다.", error);
        return;
      }

      const res = supabase.storage.from("images").getPublicUrl(data.path);
      console.log(res.data.publicUrl);

      setUploadedFileUrl((prev) => [...prev, res.data.publicUrl]);
      setFiles((prevFiles) => [file, ...prevFiles]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteImages = (index: number) => {
    setUploadedFileUrl(uploadedFileUrl.filter((_, i) => i !== index));
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach((file) => {
        handleAddImages(file);
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const onSubmit = async (formData: FormTypes) => {
    if (typeof emotion === "number") {
      formData.emotion = emotion;
    }

    formData.user_id = "832084cc-07ba-450c-8244-2cb42ce12c21";
    formData.latlng = {
      lat: 37.513272317072,
      lng: 127.09431687965,
    };
    formData.location = "잠실3사거리";
    formData.image = uploadedFileUrl;

    try {
      const { data, error } = await supabase
        .from("record")
        .insert([
          {
            emotion: formData.emotion,
            date: formData.date,
            location: formData.location,
            latlng: formData.latlng,
            content: formData.content,
            image: formData.image,
            user_id: formData.user_id,
          },
        ])
        .select();

      if (error) {
        console.log("데이터 저장에 실패했습니다.", error);
        return;
      }

      console.log(data);
      setAddMode(false);
    } catch (e) {
      console.error(e);
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
          {errors.content && <p className="empty-contents">감정을 입력해 주세요!</p>}
        </div>
        <div className="emotion-images">
          {uploadedFileUrl.length >= 10 ? (
            ""
          ) : (
            <>
              <label className="emotion-image-add" htmlFor="image">
                <img src="icon-add.svg" alt="사진 추가" />
                <span>사진 추가</span>
              </label>
              <input type="file" className="hidden" id="image" multiple onChange={handleFiles} />
            </>
          )}
          {uploadedFileUrl.map((img: string, index: number) => (
            <div className="uploaded-images" key={index}>
              <img src={img} alt={`${index}/10`} />
              <button type="button" onClick={() => handleDeleteImages(index)}>
                <i className="hidden">제거</i>
                <img src="icon-delete.svg" alt="제거" />
              </button>
            </div>
          ))}
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
