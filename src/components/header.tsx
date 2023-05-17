import * as React from "react";
import Cta from "../components/cta";
import { Image } from "@yext/pages/components";
import BookingBar from "./bookingBar";
import {
  Bars3Icon,
  PhoneIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import classNames from "classnames";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/turtlehead-tacos",
  },
];

const Header = ({ _site }: any) => {
  const { c_logoURL, c_header, name, c_relatedFacility } = _site;
  const [showMenu, setShowMenu] = useState(false);
  const linkDoms = c_header.map((link: any) => (
    <a href={link.uRL} rel="noreferrer">
      <div
        key={link.label}
        className="py-3 md:pt-0 border-b-2 border-gray-300 px-4   md:border-2 md:border-white hover:text-gray-600 md:hover:rounded-full md:hover:border-2 md:hover:border-gray-500"
      >
        {link.label}
      </div>
    </a>
  ));

  return (
    <>
      <span className="hidden md:block">
        <div className="centered-container">
          <nav className="py-6 flex items-center justify-between">
            <a href="/index.html">
              <img
                src={c_logoURL}
                alt=""
                className="w-32 h-auto  "
                style={{
                  filter:
                    "invert(47%) sepia(2%) saturate(3354%) hue-rotate(167deg) brightness(103%) contrast(73%)",
                }}
              />
            </a>
            <div className="flex gap-x-10 text-lg font-base">{linkDoms}</div>
          </nav>
        </div>
        <BookingBar
          address={c_relatedFacility[0].address}
          mainPhone={c_relatedFacility[0].mainPhone}
          hours={c_relatedFacility[0].hours}
          timezone={c_relatedFacility[0].timezone}
        ></BookingBar>
      </span>
      <span className="block md:hidden ">
        <div className="bg-white  ">
          <nav className="flex flex-col items-center justify-center">
            <a href="/index.html">
              <img
                src={c_logoURL}
                alt=""
                className="w-32 h-auto  "
                style={{
                  filter:
                    "invert(47%) sepia(2%) saturate(3354%) hue-rotate(167deg) brightness(103%) contrast(73%)",
                }}
              />
            </a>
            <div
              className={`flex relative z-50 gap-3 ${
                !showMenu ? "mt-4 -mb-4 " : "mt-4 -mb-9 "
              }`}
            >
              <PhoneIcon className="h-10 w-10 p-2 bg-white rounded-full" />
              <div>
                {!showMenu ? (
                  <Bars3Icon
                    className="h-10 w-10 p-2 bg-white rounded-full"
                    onClick={() => setShowMenu(true)}
                  />
                ) : (
                  <XCircleIcon
                    className="h-10 w-10 p-2 bg-white rounded-full"
                    onClick={() => setShowMenu(false)}
                  />
                )}
              </div>
            </div>
            {showMenu && (
              <div className="w-full transition-transform ease-in-out duration-300">
                <div className="flex flex-col w-full gap-x-10 text-lg font-base bg-gray-200 mt-6">
                  {linkDoms}
                </div>
                <BookingBar
                  address={c_relatedFacility[0].address}
                  mainPhone={c_relatedFacility[0].mainPhone}
                  hours={c_relatedFacility[0].hours}
                  timezone={c_relatedFacility[0].timezone}
                ></BookingBar>
              </div>
            )}
          </nav>
        </div>
        {/* <BookingBar
          address={c_relatedFacility[0].address}
          mainPhone={c_relatedFacility[0].mainPhone}
          hours={c_relatedFacility[0].hours}
          timezone={c_relatedFacility[0].timezone}
        ></BookingBar> */}
      </span>
    </>
  );
};

export default Header;
