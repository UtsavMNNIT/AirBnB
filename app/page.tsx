import { getListing } from "@/lib/listing";
import { ListingApp } from "@/components/ListingApp";

// Server component: loads listing data and hands it to the client app shell.
export default function Home() {
  const listing = getListing();
  return <ListingApp listing={listing} />;
}
