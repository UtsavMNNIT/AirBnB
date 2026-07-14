import type { Listing } from "@/lib/types";
import { Icon } from "../ui/Icon";
import { Avatar } from "../ui/Avatar";

export function HostCard({ listing }: { listing: Listing }) {
  const h = listing.host;
  return (
    <section>
      <h2 className="text-[22px] font-semibold text-[#222]">Meet your host</h2>

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: host card */}
        <div>
          <div className="flex items-center gap-6 rounded-3xl border border-[#EBEBEB] bg-white px-8 py-7 shadow-[0_6px_20px_rgba(0,0,0,0.10)] max-w-md">
            <div className="text-center">
              <span className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#3B5249] text-center text-[10px] font-extrabold leading-tight text-white">
                {h.logoText.map((l) => <span key={l}>{l}</span>)}
              </span>
              <div className="mt-3 text-2xl font-extrabold text-[#222]">{h.name}</div>
              <div className="text-sm text-[#222]">Host</div>
            </div>
            <div className="flex-1">
              <div className="pb-3">
                <div className="text-xl font-bold text-[#222]">{h.reviews.toLocaleString()}</div>
                <div className="text-[11px] font-semibold text-[#222]">Reviews</div>
              </div>
              <div className="border-t border-[#EBEBEB] py-3">
                <div className="flex items-center gap-1 text-xl font-bold text-[#222]">
                  {h.rating.toFixed(2)} <Icon name="starSmall" size={12} />
                </div>
                <div className="text-[11px] font-semibold text-[#222]">Rating</div>
              </div>
              <div className="border-t border-[#EBEBEB] pt-3">
                <div className="text-xl font-bold text-[#222]">{h.yearsHosting}</div>
                <div className="text-[11px] font-semibold text-[#222]">Years hosting</div>
              </div>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-[15px] text-[#222]">
            {h.facts.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="text-[#222]"><Icon name="accuracy" size={20} /></span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: co-hosts + host details */}
        <div>
          <h3 className="text-[17px] font-semibold text-[#222]">Co-Hosts</h3>
          <div className="mt-4 grid grid-cols-2 gap-y-4">
            {listing.coHosts.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <Avatar name={c.name} src={c.avatar} size={40} />
                <span className="text-[15px] text-[#222]">{c.name}</span>
              </div>
            ))}
          </div>

          <h3 className="mt-8 text-[17px] font-semibold text-[#222]">Host details</h3>
          <p className="mt-2 text-[15px] text-[#222]">{h.responseRate}</p>
          <p className="text-[15px] text-[#222]">{h.responseTime}</p>

          <button className="mt-6 rounded-lg bg-[#222] px-6 py-3 text-[15px] font-semibold text-white hover:bg-black active:scale-[0.99] transition">
            Message host
          </button>

          <p className="mt-6 flex items-start gap-2 text-[13px] text-[#717171]">
            <span aria-hidden="true">🛡️</span>
            To help protect your payment, always use Airbnb to send money and communicate with hosts.
          </p>
        </div>
      </div>
    </section>
  );
}
