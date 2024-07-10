import {
  addModeState,
  addStepState,
  bottomSheetStyleState,
  dataState,
  emotionAddMarker,
  emotionState,
  isActBottomSheetState,
  latlngState,
} from "@/atoms/atoms";
import { userState } from "@/atoms/userstate";
import Button from "@/components/button/button";
import "@/components/emotion/emotion-record.scss";
import { useModal } from "@/hooks/useModal";
import { supabase } from "@/libs/supabase";
import { RecordType } from "@/types/types";
import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Input from "@/components/input/input";

const EmotionRecord = ({ setSearch }: { setSearch: React.Dispatch<React.SetStateAction<string>> }): JSX.Element => {
  const setAddMode = useSetRecoilState(addModeState);
  const setAddStep = useSetRecoilState(addStepState);
  const setIsActBottomSheet = useSetRecoilState(isActBottomSheetState);
  const setIsEmotionAddMarker = useSetRecoilState(emotionAddMarker);
  const setBottomSheetStyle = useSetRecoilState(bottomSheetStyleState);

  const [dataList, setDataList] = useRecoilState(dataState);
  const latlng = useRecoilValue(latlngState);
  const user = useRecoilValue(userState);

  const [emotion, setEmotion] = useRecoilState(emotionState);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordType>();
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { openModal, closeModal } = useModal();

  const handleAddImages = async (file: File) => {
    try {
      const newFileName = uuidv4();
      const { data, error } = await supabase.storage.from("images").upload(`${newFileName}`, file);

      if (error) {
        console.log("파일 업로드에 실패했습니다.", error);
        return;
      }

      const res = supabase.storage.from("images").getPublicUrl(data.path);

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

  const onSubmit = async (formData: RecordType) => {
    if (typeof emotion === "number") {
      formData.emotion = emotion;
    }

    formData.user_id = user;
    formData.latlng = latlng;
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

      openModal({
        title: "감정 기록 완료",
        content: `감정을 기록하였습니다!`,
        button: "확인",
        callBack: () => closeModal(),
      });

      setAddMode(false);
      setEmotion(0);
      setDataList([...dataList, data[0]]);
      setIsActBottomSheet(false);
      setIsEmotionAddMarker(false);
      setAddStep("step1");
      setSearch("");
      if (window.innerWidth < 1024) setBottomSheetStyle({ transform: 0, height: 300 });
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
          <input
            type="date"
            id="date"
            value={selectedDate}
            {...register("date")}
            onChange={handleChange}
            max={currentDate}
          />
        </div>
        <div className="emotion-location">
          <Input id="location" placeholder="어떤 장소인가요?" {...register("location", { required: true })} />
          {errors.location && <p className="empty-contents">장소를 입력해 주세요!</p>}
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
                <img src="/icon-add.svg" alt="사진 추가" />
                <span>사진 추가</span>
              </label>
              <input
                type="file"
                className="hidden"
                id="image"
                accept=".png, .jpeg, .jpg"
                multiple
                onChange={handleFiles}
              />
            </>
          )}
          {uploadedFileUrl.map((img: string, index: number) => (
            <div className="uploaded-images" key={index}>
              <img src={img} alt={`${index}/10`} />
              <button type="button" onClick={() => handleDeleteImages(index)}>
                <i className="hidden">제거</i>
                <img src="/icon-delete.svg" alt="제거" />
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
