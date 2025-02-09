import { ApartmentCard } from "@/components/apartment-card";
import { type ApartmentDto } from "@/types/apartment";

async function getApartments(): Promise<ApartmentDto[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/apartments`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch apartments");
  }
  return response.json();
}

export default async function Home() {
  const apartments = await getApartments();

  return (
    <div className="p-8 h-screen">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
}
