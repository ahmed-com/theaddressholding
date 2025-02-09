import { ApartmentDetails } from "@/components/apartment-details";
import { type ApartmentDetailsDto } from "@/types/apartment";
import { notFound } from "next/navigation";

async function getApartment(id: string): Promise<ApartmentDetailsDto> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}`,
    {
      cache: "force-cache",
    }
  );
  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error("Failed to fetch apartment");
  }

  return response.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const apartment = await getApartment(id);
  return (
    <div>
      <ApartmentDetails apartment={apartment} />;
    </div>
  );
}
