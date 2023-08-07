"use client";
import React, { useMemo, useCallback } from "react";
import { FullConversationType } from "@/app/types";
import { useSession } from "next-auth/react";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "util";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}
const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const session = useSession();
  const otherUser = useOtherUser(data);
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (!lastMessage) return "Started a conversation";
    if (lastMessage.body) {
      return lastMessage.body;
    }
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg translation cursor-pointer p-3",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar currentUser={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p> {data.name || otherUser.name}</p>
          </div>
          <p>{lastMessageText}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
