import { type ApartmentDto } from "@/types/apartment";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import Link from "next/link";

export function ApartmentCard({ apartment }: { apartment: ApartmentDto }) {
  return (
    <Link href={`/apartments/${apartment.id}`}>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{apartment.title}</CardTitle>
          <CardDescription>{apartment.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={apartment.thumbnail}
            alt={apartment.title}
            className="w-20"
          />
          <CardFooter>{apartment.price} €</CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
}
