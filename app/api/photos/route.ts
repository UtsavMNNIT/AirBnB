import { NextResponse } from "next/server";
import { getListing } from "@/lib/listing";

// Ordered photo manifest (flat sequence + room groups) consumed by the
// Photo Tour and Lightbox overlays.
export function GET() {
  const { photos, photoGroups } = getListing();
  return NextResponse.json(
    { count: photos.length, photos, groups: photoGroups },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
