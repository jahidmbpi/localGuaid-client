"use client";

import React, { useState } from "react";
import Loader from "@/helper/loader";
import { useGetGuaidListingQuery } from "@/redux/feature/guaid/guaid.api";
import {
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
} from "@/redux/feature/listing/listing.api";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Compass,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Info,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type TourFormData = {
  title: string;
  category: string;
  city: string;
  duration: number;
  maxGroupSize: number;
  meetingPoint: string;
  price: number;
  description: string;
  itinerary: string;
  images?: FileList;
};

export default function GuideListingsPage() {
  const { data, isLoading, error } = useGetGuaidListingQuery();
  const [createListing, { isLoading: isCreating }] = useCreateListingMutation();
  const [updateListing, { isLoading: isUpdating }] = useUpdateListingMutation();
  const [deleteListing, { isLoading: isDeleting }] = useDeleteListingMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [city, setCity] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [maxGroupSize, setMaxGroupSize] = useState<number | "">("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setCategory("Adventure");
    setCity("");
    setDuration("");
    setMaxGroupSize("");
    setMeetingPoint("");
    setPrice("");
    setDescription("");
    setItinerary("");
    setFiles(null);
    setEditingTour(null);
    setFormError(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tour: any) => {
    setEditingTour(tour);
    setTitle(tour.title);
    setCategory(tour.category);
    setCity(tour.city);
    setDuration(tour.duration);
    setMaxGroupSize(tour.maxGroupSize);
    setMeetingPoint(tour.meetingPoint);
    setPrice(tour.price);
    setDescription(tour.description);
    setItinerary(tour.itinerary || "");
    setFiles(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate inputs
    if (!title || !city || !meetingPoint || !description || !price || !duration || !maxGroupSize) {
      setFormError("Please fill out all required fields.");
      return;
    }

    const payload = {
      title,
      category,
      city,
      duration: Number(duration),
      maxGroupSize: Number(maxGroupSize),
      meetingPoint,
      price: Number(price),
      description,
      itinerary,
    };

    try {
      if (editingTour) {
        // Edit mode (Normal JSON patch)
        const response = await updateListing({
          id: editingTour.id,
          data: payload,
        }).unwrap();

        if (response.success) {
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        // Add mode (FormData multipart supporting file uploads)
        if (!files || files.length === 0) {
          setFormError("Please select at least one tour image.");
          return;
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }

        const response = await createListing(formData).unwrap();
        if (response.success) {
          setIsModalOpen(false);
          resetForm();
        }
      }
    } catch (err: any) {
      console.error("Submit listing failed:", err);
      setFormError(err?.data?.message || "Something went wrong. Please check your inputs.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteListing(id).unwrap();
    } catch (err) {
      console.error("Delete listing failed:", err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const listings = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Tour Listings</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your local guide tour listings. You can add new tours, edit details, or remove listings.
          </p>
        </div>
        <Button onClick={handleOpenAddModal} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 px-5 flex items-center gap-2 cursor-pointer">
          <Plus className="w-5 h-5" />
          Add Tour Listing
        </Button>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300 max-w-xl mx-auto">
          <Compass className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-1">No Listings Found</h3>
          <p className="text-gray-500 text-sm max-w-xs mx-auto mb-5">
            You haven't posted any tour listings yet. Create your first tour listing to start hosting tourists.
          </p>
          <Button onClick={handleOpenAddModal} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            Create First Listing
          </Button>
        </div>
      ) : (
        /* Listings Table/Cards */
        <div className="overflow-x-auto border border-gray-200/85 rounded-2xl bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Tour Title</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4 text-center">Duration</th>
                <th className="py-4 px-4 text-center">Max Group</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {listings.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition duration-150">
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    <div className="flex items-center gap-3">
                      {item.images?.[0] && (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border bg-gray-100">
                          <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="max-w-[200px] truncate" title={item.title}>
                        {item.title}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      {item.city}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-900">৳ {item.price?.toLocaleString()}</td>
                  <td className="py-4 px-4 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {item.duration} hrs
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      {item.maxGroupSize}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2.5">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition cursor-pointer"
                        title="Edit Listing"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingTour ? "Edit Tour Listing" : "Add New Tour Listing"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {formError && (
                <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-2xl text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0" />
                  <p>{formError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title" className="font-semibold">Tour Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Dhaka Heritage Walk & Local Food Tasting"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-semibold">Category *</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Relax">Relax</option>
                    <option value="Nature">Nature</option>
                    <option value="Culture">Culture</option>
                    <option value="Historic">Historic</option>
                    <option value="Culinary">Culinary</option>
                  </select>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-semibold">City / Location *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Dhaka"
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="font-semibold">Price (৳) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value !== "" ? Number(e.target.value) : "")}
                    placeholder="e.g. 2000"
                    required
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration" className="font-semibold">Duration (Hours) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value !== "" ? Number(e.target.value) : "")}
                    placeholder="e.g. 5"
                    required
                  />
                </div>

                {/* Max Group Size */}
                <div className="space-y-2">
                  <Label htmlFor="maxGroupSize" className="font-semibold">Max Group Size *</Label>
                  <Input
                    id="maxGroupSize"
                    type="number"
                    min="1"
                    value={maxGroupSize}
                    onChange={(e) => setMaxGroupSize(e.target.value !== "" ? Number(e.target.value) : "")}
                    placeholder="e.g. 10"
                    required
                  />
                </div>

                {/* Meeting Point */}
                <div className="space-y-2">
                  <Label htmlFor="meetingPoint" className="font-semibold">Meeting Point *</Label>
                  <Input
                    id="meetingPoint"
                    type="text"
                    value={meetingPoint}
                    onChange={(e) => setMeetingPoint(e.target.value)}
                    placeholder="e.g. TSC, Dhaka University"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="font-semibold">Description *</Label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the tour experience, sights, and highlights..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Itinerary */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="itinerary" className="font-semibold">Itinerary (Optional)</Label>
                  <textarea
                    id="itinerary"
                    rows={3}
                    value={itinerary}
                    onChange={(e) => setItinerary(e.target.value)}
                    placeholder="e.g. 9:00 AM meeting, 10:00 AM museum visit, 12:00 PM lunch..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                {/* File Uploads (Add mode only) */}
                {!editingTour && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="files" className="font-semibold">Tour Images *</Label>
                    <Input
                      id="files"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                      className="cursor-pointer"
                      required
                    />
                    <p className="text-[11px] text-gray-400">
                      Upload one or more beautiful high-resolution photos of the tour sights.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t sticky bottom-0 bg-white">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl py-5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 font-semibold"
                >
                  {isCreating || isUpdating ? (
                    "Saving listing..."
                  ) : editingTour ? (
                    "Update Listing"
                  ) : (
                    "Publish Listing"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
