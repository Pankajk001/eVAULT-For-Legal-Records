import { NextResponse } from "next/server";
import Activity from "@/models/activityLogs";

export async function POST(request) {
  try {
    const { documentId } = await request.json();
    const activities = await Activity.find({ documentId });

    if (!activities.length) {
      return NextResponse.json({ error: 'No activities found for this document' }, { status: 404 });
    }

    return NextResponse.json(activities);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
