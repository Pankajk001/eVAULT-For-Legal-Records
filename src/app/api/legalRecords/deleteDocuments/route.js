
import Activity from '@/models/activityLogs';
import Document from '@/models/documentModel';
import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    const { documentId,userId } = await request.json();
    const document = await Document.findByIdAndDelete(documentId);

    if (!document) {
      return NextResponse.json({ error: 'No document found with this ID' }, { status: 404 });
    }
    let activity = new Activity({documentId,userId,operationPerformed:'deleted',timestamp:Date.now()});
     await activity.save();
    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
