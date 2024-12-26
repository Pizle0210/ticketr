"use client";

import { useUser } from "@clerk/nextjs";
import type { Id } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { cn, useStorageUrl } from "@/lib/utils";
import Image from "next/image";
import { CalendarDays, Check, MapPin, PencilIcon, StarIcon, Ticket } from "lucide-react";

export default function EventCard({ eventId }: { eventId: Id<"events"> }) {
  const router = useRouter();
  const { user } = useUser();

  const event = useQuery(api.events.getById, { eventId });
  const availability = useQuery(api.events.getEventAvailability, { eventId });

  // does the signedin user have a ticket
  const userTicket = useQuery(api.tickets.getUserTicketForEvent, {
    eventId,
    userId: user?.id ?? "",
  });

  const queuePosition = useQuery(api.waitingList.getQueuePosition, {
    eventId,
    userId: user?.id ?? "",
  });

  const imgUrl = useStorageUrl(event?.imageStorageId);

  if (!event || !availability) {
    return null;
  }

  const isPastEvent = event.eventDate < Date.now();
  const isEventOwner = user?.id === event?.userId;

  const renderTicketStatus = () => {
    console.log("Rendering ticket status");
    if (!user) return null;

    if (isEventOwner) {
      return (
        <div className="mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/seller/events/${eventId}/edit`);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-200"
          >
            <PencilIcon size={18} className=" " />
            Edit Event
          </button>
        </div>
      );
    }

    return null;
  };

if (userTicket) {
  return (
    <div className="mt-4 flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3">
      <div className="flex items-center">
        <Check className="mr-2 h-5 w-5 text-green-600" />
        <span className="font-medium text-green-700">You have a ticket!</span>
      </div>
      <button
        onClick={() => router.push(`/tickets/${userTicket._id}`)}
        className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-green-700"
      >
        View your ticket
      </button>
    </div>
  );
}
  return (
    <div
      className={`relative cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${isPastEvent ? `opacity-75 hover:opacity-100` : ""}`}
      onClick={() => router.push(`/event/${eventId}`)}
    >
      {/* event image */}
      {imgUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imgUrl}
            alt={event.name}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      {/* event details */}
      <div className={`p-6 ${imgUrl ? "relative" : ""}`}>
        <div className="flex items-center justify-between">
          {/* event and owners badge */}
          <div>
            <div className="flex flex-col items-start gap-2">
              {isEventOwner && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-white">
                  <StarIcon className="h-3 w-3" />
                  Your Event
                </span>
              )}
              <h2 className="text-2xl font-bold text-gray-900">
                {event!.name}
              </h2>
            </div>
            {isPastEvent && (
              <span className="mt-2 inline-flex items-center rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white/60">
                Past Event
              </span>
            )}
          </div>
        </div>

        {/* price Tag */}
        <div className="ml-4 flex flex-col items-end gap-2">
          <span
            className={cn(
              `rounded-full px-4 py-1.5 font-semibold ${isPastEvent ? "bg-gray-50 text-gray-500" : "bg-green-50 text-green-700"}`,
            )}
          >
            {event.currency}{" "}
            {event.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          {availability.purchasedCount >= availability.totalTickets && (
            <span className="rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-700">
              Sold Out
            </span>
          )}
        </div>

        {/* Event Details */}
        <div className="mt-4 space-y-3">
          {/* location */}
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2" />
            <span>{event.location}</span>
          </div>
          {/* date */}
          <div className="flex items-center text-gray-600">
            <CalendarDays size={18} className="mr-2" />
            <span>
              {new Date(event.eventDate).toLocaleDateString()}
              {isPastEvent && "(Ended)"}
            </span>
          </div>
          {/* tickets */}
          <div className="flex items-center text-gray-600">
            <Ticket size={18} className="mr-2" />
            <span>
              {availability.totalTickets - availability.purchasedCount}/{" "}
              {availability.totalTickets} available

              {!isPastEvent && availability.activeOffers > 0 && (
                <span>
                  ({availability.activeOffers}{" "}
                  {availability.activeOffers === 1 ? "person" : "people"} trying
                  to buy )
                </span>
              )}
            </span>
          </div>
        </div>
        {/* Event Description */}
        <p className="mt-4 text-gray-600 text-sm line-clamp-2">
          {event.description}
        </p>

        <div onClick={(e)=>e.stopPropagation()}>
              {!isPastEvent&& renderTicketStatus()}
        </div>
      </div>
    </div>
  );
}
