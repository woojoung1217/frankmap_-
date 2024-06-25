import EmotionEditCont from "@/components/emotion/emotion-edit-cont";

const EmotionEdit = ({ params: { id } }: { params: { id: number } }): JSX.Element => {
  return (
    <>
      <EmotionEditCont id={id} />
    </>
  );
};

export default EmotionEdit;
