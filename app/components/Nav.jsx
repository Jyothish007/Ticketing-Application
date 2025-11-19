"use client";
import {
  faHome,
  faSignOut,
  faTicket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex justify-between items-center bg-gray-100 shadow-md px-6 py-3">
      {/* Left section */}
      <div className="flex items-center space-x-6">
        <Link
          href="/dashboard"
          className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
        >
          <FontAwesomeIcon
            icon={faHome}
            className="text-xl text-gray-700 hover:text-blue-500 transition duration-200"
          />
        </Link>
        <Link
          href="/TicketPage/new"
          className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
        >
          <FontAwesomeIcon
            icon={faTicket}
            className="text-xl text-gray-700 hover:text-blue-500 transition duration-200"
          />
        </Link>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-2xl text-gray-700"
          />
          <p className="text-gray-800 font-medium truncate max-w-xs cursor-default">
            {session?.user?.email}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
        >
          <FontAwesomeIcon
            icon={faSignOut}
            className="text-xl text-gray-700 hover:text-red-500 transition duration-200"
          />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
