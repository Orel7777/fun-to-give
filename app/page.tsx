
import { TextType } from './components';

export default function Home() {
  return (
    <main>
     <div className="flex flex-col justify-center items-center h-screen">
      <TextType 
        text={["איזה פונט הכי מדבר אליך?"]}
        className="text-4xl font-bold almoni-bold"
        textColors={["#000000"]}
        typingSpeed={100}
        showCursor={false}
        loop={false}
      />
      <h2 className="text-2xl font-bold text-black">או</h2>
      <TextType 
        text={["או הפונט הזה ששניהם הם דוגמאות משני האתרים ששלחת לנו"]}
        className="text-4xl font-bold"
        textColors={["#000000"]}
        typingSpeed={100}
        showCursor={false}
        loop={false}
      />
     </div>
    </main>
  );
}
