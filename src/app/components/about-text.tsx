import TextType from "@/components/reactbits/TextType/TextType";

const AboutText = () => {
  return (
    <TextType
      text={["Hello", "A short story about myself", "Let's, get to know me"]}
      typingSpeed={120}
      pauseDuration={2000}
      deletingSpeed={90}
      showCursor={true}
      cursorCharacter="•"
      className="text-3xl md:text-8xl font-bold text-start mb-10 text-neutral-800 dark:text-gray-200"
    />
  );
};

export default AboutText;
