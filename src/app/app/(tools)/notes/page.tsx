import { DatePickerWithContext, DateProvider } from "@/context/DateProvider";
import connectToDB from "@/database/connection";
import Note from "@/database/models/Note";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";
import Editor from "@/features/note/components/editor";
import React, { Suspense } from "react";

// TODO: Add a loading state and parallel fetching
export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const params = await searchParams;
  const date = params.date ? new Date(params.date) : new Date();

  return (
    <DateProvider>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
              Notes
            </h1>
            <DatePickerWithContext />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <Suspense
              key={`${date}`}
              fallback={
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              }
            >
              <NoteStream userId={user!.userId} date={date} />
            </Suspense>
          </div>
        </div>
      </div>
    </DateProvider>
  );
}

async function NoteStream({
  userId,
  date = new Date(),
}: {
  userId: string;
  date: Date;
}) {
  const note = await getCreateNote(userId, date);

  return (
    <Editor
      noteContent={note.note}
      userId={userId}
      noteId={String(note._id)}
    ></Editor>
  );
}

async function getCreateNote(userId: string, date: Date) {
  await connectToDB();

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  let note = await Note.findOne({
    $and: [{ user: userId }, { date: { $gte: startOfDay, $lte: endOfDay } }],
  });

  if (!note) {
    note = await Note.create({
      user: userId,
      date: new Date(date),
    });
  }

  return note;
}
