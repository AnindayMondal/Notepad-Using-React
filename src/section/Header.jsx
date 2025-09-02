import config from "../config";

const Header = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <h1 className="text-3xl font-bold text-black p-1">{config.appName}</h1>
    </div>
  );
};

export default Header;