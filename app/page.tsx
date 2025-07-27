
import { TextType, SplashCursor } from './components';
import NavigationBar from './pages/Navbar';

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main className="pt-16">
        <div className="flex flex-col justify-center items-center px-4 min-h-screen sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <TextType 
              text={["איזה פונט הכי מדבר אליך?"]}
              className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl almoni-bold"
              textColors={["#000000"]}
              typingSpeed={100}
              showCursor={false}
              loop={false}
            />
            <h2 className="mb-4 text-lg font-bold text-black sm:text-xl md:text-2xl">או</h2>
            <TextType 
              text={["או הפונט הזה ששניהם הם דוגמאות משני האתרים ששלחת לנו"]}
              className="text-lg font-bold leading-relaxed sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              textColors={["#000000"]}
              typingSpeed={100}
              showCursor={false}
              loop={false}
            />
          </div>
        </div>
        <SplashCursor />
      </main>
    </>
  );
}
