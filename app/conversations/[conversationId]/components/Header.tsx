"use client";
import React, { useMemo } from "react";
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return "Active";
  }, [conversation]);

  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          href="/conversations"
        >
          <HiChevronLeft />
        </Link>
        <Avatar currentUser={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser?.name || otherUser?.email}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        className="text-sky-500 cursor-pointer hover:text-sky-600 translation"
      />
    </div>
  );
};

export default Header;
