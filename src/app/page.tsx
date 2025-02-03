import Radio from "@/components/radio/radio";

export default function Home() {
  return (
    <div>
      <Radio
        title={"이용약관 동의"}
        subTitle="선택"
        name={"agree"}
        value={"agree"}
      />
    </div>
  );
}
