import { NextResponse } from "next/server";
import { getListing } from "@/lib/listing";

// Lightweight backend: serves the full typed listing payload.
// In a production marketplace this would proxy the listing microservice.
export function GET() {
  return NextResponse.json(getListing(), {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
