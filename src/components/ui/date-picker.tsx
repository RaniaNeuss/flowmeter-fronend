"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import 'react-day-picker/dist/style.css';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export interface DatePickerProps {
  value?: string;
  onChange?: (date: string | undefined) => void;
  startYear?: number;
  endYear?: number;
}

export function DatePicker({
  value,
  onChange,
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
}: DatePickerProps) {
  const selectedDate = value ? new Date(value) : undefined;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    if (!selectedDate) return;
    const newDate = setMonth(selectedDate, months.indexOf(month));
    onChange?.(newDate.toISOString().split("T")[0]);
  };

  const handleYearChange = (year: string) => {
    if (!selectedDate) return;
    const newDate = setYear(selectedDate, parseInt(year));
    onChange?.(newDate.toISOString().split("T")[0]);
  };

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date ? date.toISOString().split("T")[0] : undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[250px] flex justify-between text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <span className="truncate">
            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
          </span>
          <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        {/* Scoped style reset to avoid inherited green styles */}
          <div className="flex justify-between p-2">
            <Select
              onValueChange={handleMonthChange}
              value={selectedDate ? months[getMonth(selectedDate)] : undefined}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={handleYearChange}
              value={selectedDate ? getYear(selectedDate).toString() : undefined}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="[&_.rdp]:!text-foreground [&_.rdp]:!bg-background [&_.rdp]:text-sm">
  <Calendar
    mode="single"
    selected={selectedDate}
    onSelect={handleSelect}
    autoFocus
    month={selectedDate}
    onMonthChange={(m) => onChange?.(m?.toISOString().split("T")[0])}
  />
</div>

      </PopoverContent>
    </Popover>
  );
}