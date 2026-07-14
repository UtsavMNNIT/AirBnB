"use client";

import { createContext, useContext, useMemo, useState } from "react";

export interface Ymd { y: number; m: number; d: number } // m is 0-indexed (Jan=0)
export interface Guests { adults: number; children: number; infants: number; pets: number }

export interface BookingConfig {
  currency: string;
  nightlyRate: number;
  cleaningFee: number;
  serviceFee: number;
  maxGuests: number;
}

export interface PriceBreakdown {
  nights: number;
  nightly: number;
  subtotal: number;
  cleaning: number;
  service: number;
  total: number;
  currency: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const time = (d: Ymd) => new Date(d.y, d.m, d.d).getTime();
export const sameDay = (a: Ymd | null, b: Ymd | null) =>
  !!a && !!b && a.y === b.y && a.m === b.m && a.d === b.d;
/** -1 if a<b, 0 if equal, 1 if a>b */
export const cmp = (a: Ymd, b: Ymd) => Math.sign(time(a) - time(b));
export const formatYmd = (d: Ymd | null) => (d ? `${d.d} ${MONTHS[d.m]} ${d.y}` : "");
export const formatSlash = (d: Ymd | null) => (d ? `${d.m + 1}/${d.d}/${d.y}` : "");
const nightsBetween = (a: Ymd, b: Ymd) => Math.max(0, Math.round((time(b) - time(a)) / 86_400_000));

interface Ctx {
  checkIn: Ymd | null;
  checkOut: Ymd | null;
  guests: Guests;
  config: BookingConfig;
  nights: number;
  price: PriceBreakdown | null;
  rangeLabel: string;
  guestLabel: string;
  totalGuests: number;
  selectDay: (day: Ymd) => void;
  clearDates: () => void;
  setGuests: (next: Guests) => void;
}

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({
  config,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  children,
}: {
  config: BookingConfig;
  initialCheckIn: Ymd | null;
  initialCheckOut: Ymd | null;
  initialGuests: Guests;
  children: React.ReactNode;
}) {
  const [checkIn, setCheckIn] = useState<Ymd | null>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Ymd | null>(initialCheckOut);
  const [guests, setGuests] = useState<Guests>(initialGuests);

  const selectDay = (day: Ymd) => {
    // Fresh start when nothing chosen or a full range already exists.
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
      return;
    }
    // A check-in exists, no checkout yet.
    if (cmp(day, checkIn) > 0) setCheckOut(day);
    else setCheckIn(day); // earlier-or-equal click becomes the new check-in
  };

  const clearDates = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;

  const price: PriceBreakdown | null = useMemo(() => {
    if (!nights) return null;
    const subtotal = config.nightlyRate * nights;
    return {
      nights,
      nightly: config.nightlyRate,
      subtotal,
      cleaning: config.cleaningFee,
      service: config.serviceFee,
      total: subtotal + config.cleaningFee + config.serviceFee,
      currency: config.currency,
    };
  }, [nights, config]);

  const rangeLabel = checkIn && checkOut ? `${formatYmd(checkIn)} – ${formatYmd(checkOut)}` : "";
  const totalGuests = guests.adults + guests.children;
  const guestLabel = useMemo(() => {
    const parts = [`${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`];
    if (guests.infants) parts.push(`${guests.infants} infant${guests.infants !== 1 ? "s" : ""}`);
    if (guests.pets) parts.push(`${guests.pets} pet${guests.pets !== 1 ? "s" : ""}`);
    return parts.join(", ");
  }, [totalGuests, guests.infants, guests.pets]);

  const value: Ctx = {
    checkIn, checkOut, guests, config, nights, price, rangeLabel, guestLabel, totalGuests,
    selectDay, clearDates, setGuests,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
