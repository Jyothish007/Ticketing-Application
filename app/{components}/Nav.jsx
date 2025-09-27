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
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div className="flex">
        <FontAwesomeIcon icon={faUserCircle} className="icon pr-2" />
        <p className="text-default-text">{session?.user?.email}</p>
        <Link href="/api/auth/signout">
          <FontAwesomeIcon
            icon={faSignOut}
            onClick={() => signOut()}
            className="icon"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
