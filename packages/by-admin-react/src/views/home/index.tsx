import { FC } from "react";

const Home: FC = () => {
  return (
    <div>
      <div text-red-6>这是内容视图区域 </div>

      <div className="i-ph-anchor-simple-thin" />
      <div className="i-mdi-alarm text-orange-400" />
      <div className="i-logos-vue text-3xl" />
      <button className="i-carbon-sun dark:i-carbon-moon" />
      <div className="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
    </div>
  );
};

export default Home;
