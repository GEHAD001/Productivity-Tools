"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "@/components/ui/date-picker";

// Context State Content
type DateContextType = {
  date: Date;
  setDate: (date: Date) => void;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export function DateProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize date from URL or current date
  const [date, setDate] = useState<Date>(() => {
    const dateParam = searchParams.get("date");
    return dateParam ? new Date(dateParam) : new Date();
  });

  // Sync URL with date state
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", date.toDateString());
    router.push(`${pathname}?${params.toString()}`);
  }, [date, pathname, router, searchParams]);

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDateContext() {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
}

export function DatePickerWithContext() {
  const { date, setDate } = useDateContext();

  return <DatePicker date={date} onSelect={setDate} />;
}

/*

    Why Date Provider (answer => Share State):
    
    @ when date-picker update the date, render-context.
    @ context read latest date, & update url.
    @ page access to date and get all associated data with date.
    
*/
