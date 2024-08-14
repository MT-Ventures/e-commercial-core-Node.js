import React, { useState } from "react";
import images from "../constants/images.js";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiMicrophoneOn, CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);

  const navVisibilityHandler = () => {
    setNavIsVisible((state) => !state);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <section className="sticky top-0 left-0 right-0 z-50 bg-transparent hover:bg-white transition-all">
        <header className="container mx-auto px-5 flex justify-between py-4 items-center">
          <div>
            <img className="w-16" src={images.logo} alt="logo" />
          </div>
          <div className="lg:hidden z-50">
            {navIsVisible ? (
              <AiOutlineClose
                className="w-6 h-6"
                onClick={navVisibilityHandler}
              />
            ) : (
              <AiOutlineMenu
                className="w-6 h-6"
                onClick={navVisibilityHandler}
              />
            )}
          </div>

          <div
            className={`${
              navIsVisible ? "right-0" : "-right-full"
            } transition-all duration-300 mt-[70px] lg:mt-0 bg-white lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0  lg:static gap-x-9 items-center`}
          >
            <SearchBar />
            <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
              {navItemsInfo.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </ul>

            {userState.userInfo ? (
              <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <button
                      className=" flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-400 px-5 py-2 rounded-full text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300"
                      onClick={() => setProfileDropdown(!profileDropdown)}
                    >
                      <span>Account</span>
                      <MdOutlineKeyboardArrowDown />
                    </button>

                    <div
                      className={`${
                        profileDropdown ? "block" : "hidden"
                      } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                    >
                      <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                        <button
                          type="button"
                          className="hover:bg-dark-hard hover:text-white px-4 py-2 texy-white lg:text-dark-soft"
                        >
                          Profile Page
                        </button>
                        <button
                          type="button"
                          onClick={logoutHandler}
                          className="hover:bg-dark-hard hover:text-white px-4 py-2 texy-white lg:text-dark-soft"
                        >
                          Logout
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-5 lg:mt-0 px-5 py-2  font-semibold hover:bg-black hover:text-white transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/sign-in")}
                  className="mt-5 lg:mt-0 border-2 border-black px-5 py-2 text-black font-semibold hover:bg-black hover:text-white transition-all duration-300"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </header>
        <CategoriesBar></CategoriesBar>
      </section>
    </>
  );
};

export default Header;

const navItemsInfo = [
  { name: "Favorilerim", type: "link", icon: <FaRegHeart /> },
  { name: "Sepetim", type: "link", icon: <IoCartOutline /> },
];

const NavItem = ({ item }) => {
  return (
    <>
      <li className="relative group flex items-center">
        <>
          <a href="/" className="flex items-center px-2 py-2">
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.name}
          </a>
        </>
      </li>
    </>
  );
};

const SearchBar = () => {
  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
      <div className="md:flex">
        <div className="w-full p-3 ">
          <div className="relative">
            <span className="absolute text-gray-400 top-5 left-4">
              <CiSearch />
            </span>
            <input
              type="text"
              className="bg-white h-14 w-full px-60 rounded-lg focus:outline-none hover:cursor-pointer border-2"
            />
            <span className="absolute top-4 right-5 border-l pl-4">
              <CiMicrophoneOn />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesBar = () => {
  const categories = [
    "Kadın",
    "Erkek",
    "Anne&Çocuk",
    "Ev&Yaşam",
    "Süpermarket",
    "Kozmetik",
    "Ayakkabı&Çanta",
    "Elektronik",
    "Spor&Outdoor",
    "Çok Satanlar",
    "Flaş Ürünler"
  ];

  return (
    <div className="w-full h-8 bg-transparent hover:bg-white py-1">
      <div className="container mx-auto px-5 flex justify-center">
        <ul className="flex space-x-4">
          {categories.map((category) => (
            <li
              key={category}
              className="text-gray-700 hover:text-black text-sm"
            >
              <a href={`/${category.toLowerCase().replace(/ /g, "-")}`}>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
