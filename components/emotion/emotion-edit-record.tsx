"use client";

import Loading from "@/app/loading";
import { editStepState, emotionState } from "@/atoms/atoms";
import { userState } from "@/atoms/userstate";
import "@/components/emotion/emotion-edit-record.scss";
import { useModal } from "@/hooks/useModal";
import { supabase } from "@/libs/supabase";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Button from "../button/button";
import Input from "../input/input";
import NotFound from "@/app/not-found";

interface RecordData {
  emotion: number;
  date: string;
  location: string;
  content: string;
  image: string[];
}

interface FormTypes {
  emotion: number;
  content: string;
  date: string;
  location: string;
  image: string[];
}

const EmotionEditRecord = ({ id }: { id: number }): JSX.Element => {
  const [data, setData] = useState<RecordData>();
  const [initialEmotion, setInitialEmotion] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const setEditStep = useSetRecoilState(editStepState);
  const [emotion, setEmotion] = useRecoilState(emotionState);
  const router = useRouter();
  const user = useRecoilValue(userState);
  const { openModal, closeModal } = useModal();
  const [notFound, setNotFound] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const record = await fetchRecord();

      if (record) {
        setData(record);
      } else {
        setNotFound(false);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    values: {
      emotion: emotion,
      content: content,
      date: selectedDate,
      location: location,
      image: imgUrl,
    },
  });

  const fetchRecord = async (): Promise<RecordData | undefined> => {
    try {
      const { data, error } = await supabase
        .from("record")
        .select("emotion, date, location, content, image")
        .eq("user_id", user)
        .eq("record_id", id);

      if (error) {
        throw error;
      }

      setInitialEmotion(data[0].emotion);
      setSelectedDate(data[0].date);
      setCurrentDate(data[0].date);
      setContent(data[0].content);
      setLocation(data[0].location);
      setImgUrl(data[0].image);

      return data[0];
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = () => {
    setEditStep("step1");
  };

  const handleAddImages = async (file: File) => {
    try {
      const newFileName = uuidv4();
      const { data, error } = await supabase.storage.from("images").upload(`${newFileName}`, file);

      if (error) {
        console.log("파일 업로드에 실패했습니다.", error);
        return;
      }

      const res = supabase.storage.from("images").getPublicUrl(data.path);

      setImgUrl((prev) => [...prev, res.data.publicUrl]);
      setFiles((prevFiles) => [file, ...prevFiles]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteImages = (index: number) => {
    setImgUrl(imgUrl.filter((_, i) => i !== index));
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
    if (emotion) {
      formData.emotion = emotion;
    } else {
      formData.emotion = initialEmotion;
    }

    try {
      const { error } = await supabase
        .from("record")
        .update({
          emotion: formData.emotion,
          date: formData.date,
          location: formData.location,
          content: formData.content,
          image: formData.image,
        })
        .eq("user_id", user)
        .eq("record_id", id)
        .select();

      if (error) {
        console.log("데이터 수정에 실패했습니다.", error);
        return;
      }

      openModal({
        title: "감정 수정 완료",
        content: `감정을 수정하였습니다!`,
        button: "확인",
        callBack: () => closeModal(),
      });

      setEmotion(0);
      router.push("/emotion");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {notFound ? (
        data ? (
          <div className="emotion-edit-container">
            <div className="emotion-edit-header">감정 수정</div>
            <form onSubmit={handleSubmit(onSubmit)} className="emotion-edit-form">
              <div className="emotion-date">
                <button type="button" onClick={handleClick}>
                  <i className="hidden">감정 변경</i>
                  {emotion ? (
                    <img className="emotion-emoji" src={`/emotion${emotion}-folded.svg`} alt={`감정코드: ${emotion}`} />
                  ) : (
                    <img
                      className="emotion-emoji"
                      src={`/emotion${initialEmotion}-folded.svg`}
                      alt={`감정코드: ${initialEmotion}`}
                    />
                  )}
                </button>

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
                {imgUrl.length >= 10 ? (
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
                      accept=".png, .jpeg, .jpg"
                      id="image"
                      multiple
                      onChange={handleFiles}
                    />
                  </>
                )}
                {imgUrl.map((img: string, index: number) => (
                  <div className="uploaded-images" key={index}>
                    <img src={img} alt={`${index}/10`} />
                    <button type="button" onClick={() => handleDeleteImages(index)}>
                      <i className="hidden">제거</i>
                      <img src="/icon-delete.svg" alt="제거" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="emotion-edit-button">
                <Button color="primary" handleClick={() => router.push(`/emotion`)}>
                  뒤로가기
                </Button>
                <Button type="submit" color="secondary">
                  수정하기
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <Loading />
        )
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default EmotionEditRecord;
