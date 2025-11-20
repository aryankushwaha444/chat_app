import React from "react";

interface Props {
  username: string;
  message: string;
  createdAt?: string;
}

export const MessageItem: React.FC<Props> = ({
  username,
  message,
  createdAt,
}) => {
  return (
    <div className="p-2 border-b">
      <div className="text-sm text-gray-600">
        {username}{" "}
        <span className="text-xs text-gray-400">
          {" "}
          {createdAt ? new Date(createdAt).toLocaleTimeString() : ""}
        </span>
      </div>
      <div className="mt-1">{message}</div>
    </div>
  );
};
