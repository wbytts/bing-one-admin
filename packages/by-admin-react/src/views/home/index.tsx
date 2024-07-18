import { FC } from "react";

const HomePage: FC = () => {
  let x = 3;

  console.log("HomePage");

  return (
    <div>
      <div className="flex justify-around w-200px border-1 border-solid border-green-6">
        <div className="w-20px h-20px bg-red-2"></div>
        <div className="w-20px h-20px bg-red-2"></div>
        <div className="w-20px h-20px bg-red-2"></div>
      </div>
    </div>
  );
};

export default HomePage;
