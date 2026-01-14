"use client";
import {
  useGetUserByIdQuery,
  useUpdateUserByIDMutation,
} from "@/redux/feature/user/user.api";

import { use } from "react";

export default function UpdateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  console.log("this is id from update profile page", id);

  const { data: user } = useGetUserByIdQuery(id);

  const [updateUser, { isLoading }] = useUpdateUserByIDMutation();
  console.log(user);

  return (
    <div className="max-w-6xl mx-auto min-h-screen flex items-center justify-center">
      this is update profile page
    </div>
  );
}
