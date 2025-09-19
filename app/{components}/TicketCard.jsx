"use client";
import Link from "next/link";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";

const TicketCard = ({ ticket }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-lg shadow-lg p-4 m-2">
      <div className="flex mb-2">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
        <h4 className="text-xl">{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="text-sm text-default-text whitespace-pre-wrap">
          {ticket.description}
        </p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs m-1 text-default-text">
              {formatDate(ticket.createdAt)}
            </p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div className="ml-auto flex  items-end">
            <StatusDisplay status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
