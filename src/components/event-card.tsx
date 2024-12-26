"use client"
import { useUser } from "@clerk/nextjs";
import type { Id } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";

export default function EventCard({ eventId }: { eventId: Id<"events"> }) {
  const router = useRouter()
  const {user} = useUser()

  const event = useQuery(api.events.getById,{eventId})
  const availability = useQuery(api.events.getEventAvailability,{eventId})

  // does the signedin user have a ticket
  const userTicket = useQuery()
  return <div>

  </div>;
}
