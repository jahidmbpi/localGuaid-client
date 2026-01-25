"use client";

import {
  useGetUserByIdQuery,
  useUpdateUserByIDMutation,
} from "@/redux/feature/user/user.api";
import { X } from "lucide-react";
import Image from "next/image";
import { use, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  presentAddress?: string;
  parmanentAddress?: string;
  profilePhoto?: FileList;
};

export default function UpdateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: user } = useGetUserByIdQuery(id);
  const userdata = user?.data;

  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [updateUser, { isLoading }] = useUpdateUserByIDMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: userdata?.name,
      email: userdata?.email,
      phone: userdata?.phone,
      bio: userdata?.bio,
      presentAddress: userdata?.presentAddress,
      parmanentAddress: userdata?.parmanentAddress,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data, "data from from");
  };

  return (
    <div className="max-w-6xl mx-auto min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto py-10 w-full">
        <h1 className="text-2xl font-bold mb-6">Update Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              {...register("phone")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              {...register("bio")}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Present Address</label>
            <input
              type="text"
              {...register("presentAddress")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Permanent Address</label>
            <input
              type="text"
              {...register("parmanentAddress")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Profile Photo</label>

            <Controller
              name="profilePhoto"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        field.onChange(e.target.files);
                      }
                    }}
                  />

                  {!preview && (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="border px-4 py-2 rounded"
                    >
                      Upload Photo
                    </button>
                  )}

                  {preview && (
                    <div className="relative w-40 h-40">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover rounded border"
                      />
                      <X
                        size={18}
                        className="absolute -top-2 -right-2 cursor-pointer bg-white rounded-full"
                        onClick={() => {
                          setPreview(null);
                          field.onChange(undefined);
                          if (fileRef.current) {
                            fileRef.current.value = "";
                          }
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
