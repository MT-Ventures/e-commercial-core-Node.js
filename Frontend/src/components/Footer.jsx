import React from "react";
import images from "../constants/images.js";
import { RiTwitterXLine } from "react-icons/ri";
import { FiFacebook } from "react-icons/fi";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <section className="bg-slate-500">
        <footer className="container mx-auto grid grid-cols-10 px-5 py-1 gap-y-1 gap-x-3 md:pt-6 pb-6 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10 ">
          <div className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className="text-black font-bold md:text-lg">Product</h3>
            <ul className="text-white font-medium text-sm mt-2 space-y-1">
              <li>
                <a href="/">Landingpage</a>
              </li>
              <li>
                <a href="/">Futures</a>
              </li>
              <li>
                <a href="/">Documentions</a>
              </li>
              <li>
                <a href="/">Referral Program</a>
              </li>
              <li>
                <a href="/">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className="text-black font-bold md:text-lg">Services</h3>
            <ul className="text-white font-medium text-sm mt-2 space-y-1">
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">Design</a>
              </li>
              <li>
                <a href="/">Themes</a>
              </li>
              <li>
                <a href="/">Illustration </a>
              </li>
              <li>
                <a href="/">UI Kit</a>
              </li>
            </ul>
          </div>
          <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto">
            <h3 className="text-black font-bold md:text-lg">Company</h3>
            <ul className="text-white font-medium text-sm mt-2 space-y-1">
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Terms</a>
              </li>
              <li>
                <a href="/">Privancy Policy</a>
              </li>
              <li>
                <a href="/">Careers</a>
              </li>
            </ul>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-2">
            <h3 className="text-black font-bold md:text-lg">More</h3>
            <ul className="text-white font-medium text-sm mt-2 space-y-1">
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">License</a>
              </li>
              <li>
                <a href="/">Changelog</a>
              </li>
            </ul>
          </div>
          <div className="col-span-10 md:order-first  md:col-span-4  lg:col-span-2">
            <img
              src={images.logo}
              alt="logo"
              className="w-20 h-auto mx-auto md:mx-0 "
            ></img>
            <p className="text-sm text-dark-light text-center mt-4 md:text-left md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <ul className="flex justify-center items-center mt-0 space-x-1 text-gray-300 md:justify-start">
              <li>
                <a href="/">
                  <RiTwitterXLine className="w-5 h-auto"></RiTwitterXLine>
                </a>
              </li>
              <li>
                <a href="/">
                  <FiFacebook className="w-5 h-auto"></FiFacebook>
                </a>
              </li>
              <li>
                <a href="/">
                  <AiFillLinkedin className="w-5 h-auto"></AiFillLinkedin>
                </a>
              </li>
              <li>
                <a href="/">
                  <AiOutlineInstagram className="w-5 h-auto"></AiOutlineInstagram>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Footer;
