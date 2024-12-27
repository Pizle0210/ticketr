/* eslint-disable @typescript-eslint/no-unused-vars */
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { WAITING_LIST_STATUS } from "./constant";

/**
 * Query to get a user's current position in the waiting list for an event.
 * Returns null if user is not in queue, otherwise returns their entry with position.
 */
export const getQueuePosition = query({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
  },
  handler: async (ctx, { eventId, userId }) => {
    // Get entry for this specific user and event combination
    const entry = await ctx.db
      .query("waitingList")
      .withIndex("by_user_event", (q) =>
        q.eq("userId", userId).eq("eventId", eventId),
      )
      .filter((q) => q.neq(q.field("status"), WAITING_LIST_STATUS.EXPIRED)) //filter out where its not equal to expired ticket{returns open tickets }
      .first();

    if (!entry) return null;

    // Get total number of people ahead in line
    const peopleAhead = await ctx.db
      .query("waitingList")
      // Use the index to filter entries by event ID
      .withIndex("by_event_status", (q) => q.eq("eventId", eventId))
      .filter((q) =>
        q.and(
          // Filter entries created before the current user's entry
          q.lt(q.field("_creationTime"), entry._creationTime),
          // Include only entries with status 'WAITING' or 'OFFERED'
          q.or(
            q.eq(q.field("status"), WAITING_LIST_STATUS.WAITING),
            q.eq(q.field("status"), WAITING_LIST_STATUS.OFFERED),
          ),
        ),
      )
      // Collect all matching entries and count them
      .collect()
      .then((entries) => entries.length);

    // Return the user's entry with their position in the queue
    return {
      ...entry,
      position: peopleAhead + 1, // Position is the count of people ahead plus one
    };
  },
});

export const releaseTicket = mutation({
  args: {
    eventId: v.id("events"),
    waitingListId: v.id("waitingList"),
  },
  handler: async (ctx, { eventId, waitingListId }) => {
    const entry = await ctx.db.get(waitingListId);
    if (!entry || entry.status !== WAITING_LIST_STATUS.OFFERED) {
      throw new Error("No valid ticket offer found");
    }

    // Mark the entry as expired
    await ctx.db.patch(waitingListId, {
      status: WAITING_LIST_STATUS.EXPIRED,
    });

    //  TODO: Process queue to offer ticket to next person
    // await processQueue(ctx, { eventId });
  },
});