import CloseIcon from "@mui/icons-material/Close";

interface ResponsiveSearchPageProps {
  setSearchBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResponsiveSearchPage: React.FC<ResponsiveSearchPageProps> = ({
  setSearchBarVisible,
}) => {
  return (
    <div className="bg-white z-50 h-screen w-full absolute top-0">
      <div
        className={`flex items-center w-full h-[50px] border border-input bg-white px-2 mt-2`}
      >
        <input
          type="text"
          placeholder="Search Here"
          className={`w-[90%] h-full focus:outline-none`}
        />
        <button onClick={() => setSearchBarVisible(false)} className="w-[10%]">
          <CloseIcon sx={{ color: "gray" }} />
        </button>
      </div>
    </div>
  );
};

export default ResponsiveSearchPage;
