export interface EventData {
  id: string;
  number: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  cta: string;
}

// TEMPORARY PREVIEW EVENTS
// Replace with official Lloyds CHSL event data when received.

export const events: readonly EventData[] = [
  {
    id: "independence-day",
    number: "01",
    title: "INDEPENDENCE DAY CELEBRATION",
    date: "15 August 2026",
    time: "8:00 AM – 10:30 AM",
    venue: "Society Courtyard",
    description: "Residents are invited to join the Independence Day gathering with flag hoisting, the national anthem and community refreshments.",
    cta: "View details"
  },
  {
    id: "ganesh-chaturthi",
    number: "02",
    title: "GANESH CHATURTHI CELEBRATION",
    date: "14 September 2026",
    time: "6:30 PM onwards",
    venue: "Society Common Area",
    description: "Residents and families are invited to come together for the society's Ganesh Chaturthi celebration and community gathering.",
    cta: "View details"
  },
  {
    id: "tree-plantation",
    number: "03",
    title: "TREE PLANTATION DRIVE",
    date: "02 October 2026",
    time: "8:30 AM – 10:30 AM",
    venue: "Society Premises",
    description: "A community plantation initiative encouraging residents to participate in adding more greenery to the society surroundings.",
    cta: "Participate"
  }
];
