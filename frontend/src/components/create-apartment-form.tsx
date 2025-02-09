"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VirtualProgress } from "./virtual-progress";
import { Textarea } from "./ui/textarea";

export function CreateApartmentForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  if (loading) {
    return <VirtualProgress />;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (user && user.role !== "ADMIN") {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    if (price !== undefined) formData.append("price", price.toString());
    if (images) {
      Array.from(images).forEach((file) => formData.append("images", file));
    }

    const token = localStorage.getItem("access_token");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/apartments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating apartment");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Apartment</CardTitle>
          <CardDescription>
            {error && (
              <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>
            )}
            {success && (
              <div className="bg-green-100 text-green-800 p-2 mb-4">
                Apartment created successfully!
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="string"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="description">Description</Label>
                </div>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="string"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Apartment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
