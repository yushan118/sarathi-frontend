"use client";

// Importing necessary components and functions from specified paths
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hook";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { suspendUser, editUser } from "./server-actions";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

// Component for editing user details
export default function UserEdit({
  _id,
  name,
  mobile_number,
  is_suspended,
}: {
  _id: string;
  name: string;
  mobile_number: string;
  is_suspended: boolean;
}) {

  // State to track whether the user details section is expanded or not
  const [expand, setExpand] = useState(false);

  // Schema definition for form validation using zod
  const schema = z.object({
    name: z.string(),
    phone_number: z.string().length(10),
  });

  // Type definition for the inferred type from the zod schema
  type schemaType = z.infer<typeof schema>;

    // React Hook Form setup
  const { control, handleSubmit } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name,
      phone_number: mobile_number,
    },
  });

  // UseAction hook for executing the editUser API call
  const { execute, status } = useAction(editUser, {
    onSuccess: () => {
      toast.success("User edited successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // UseAction hook for executing the suspendUser API call
  const { execute: executeSuspend } = useAction(suspendUser, {
    onSuccess: () => {
      toast.success("User edited successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return (
    <>

      {/* Displaying basic user details */}
      <tr
        className={twMerge("cursor-pointer font-medium dark:border-[#E7E8EA]", is_suspended && "text-red-500", !expand && "border-b-2")}
        onClick={() => setExpand((cur) => !cur)}
      >
        <td className="p-4">{name}</td>
        <td className="p-4">{mobile_number}</td>
        <td className="p-4">

          {/* Link to view the user's profile */}
          <Link
            href={`/user/${mobile_number}`}
            className="col-span-2 pl-8 text-center"
          >
            <button type="button">View profile</button>
          </Link>
        </td>
      </tr>

      {/* Expanded section for editing user details */}
      {expand && (
        <tr>
          <td colSpan={3}>

            {/* Form for editing user details */}
            <form
              className="mb-4 mt-2 flex w-[200px] flex-col gap-2 mx-auto"
              onSubmit={handleSubmit((data) => {
                execute({ id: _id, ...data });
              })}
            >

              {/* Controller for handling name input */}
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2">

                    {/* Input for name */}
                    <input
                      {...field}
                      placeholder="Name"
                      className="rounded-sm border border-gray-400 px-2 py-1 outline-none"
                    />

                    {/* Displaying error message if any */}
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              {/* Controller for handling phone number input */}
              <Controller
                control={control}
                name="phone_number"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2">

                    {/* Input for phone number */}
                    <input
                      {...field}
                      placeholder="Phone Number"
                      className="rounded-sm border border-gray-400 px-2 py-1 outline-none"
                    />

                    {/* Displaying error message if any */}
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Buttons for updating and suspending/unsuspending the user */}
              <div className="grid grid-cols-2 gap-2">

                {/* Update button */}
                <button
                  disabled={status == "executing"}
                  className="disabled:text-gray-400"
                  type="submit"
                >
                  
                  {/* Suspend/Unsuspend button */}
                  Update
                </button>
                <button
                  disabled={status == "executing"}
                  className="disabled:text-gray-400"
                  onClick={(e) => {
                    e.preventDefault();
                    executeSuspend({
                      id: _id,
                      action: is_suspended ? "unsuspend" : "suspend",
                    });
                  }}
                >
                  {is_suspended ? "Unsuspend" : "Suspend"}
                </button>
              </div>
            </form>
          </td>
        </tr>
      )}
    </>
  );
}
