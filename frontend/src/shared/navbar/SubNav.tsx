const SubNav = () => {
  return (
    <div className="pb-2 border-b border-b-[#ebebeb]">
      <div className="flex items-center justify-between h-10 leading-8 text-[8px] md:text-xs container px-4 xl:px-0">
        <>
          <h6 className="text-black font-semibold">Welcome To Tech-Hub</h6>
        </>
        <div className="flex items-center text-black font-medium">
          <a
            href="mailto:mdnaimurrahman681@gmail.com"
            className="border-r border-r-light-gray border-l border-l-light-gray px-1"
          >
            mdnaimurrahman681@gmail.com
          </a>
          <a
            href="tel:+8801632970990"
            className="border-r border-r-light-gray h-full px-1 "
          >
            +8801632970990
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubNav;
