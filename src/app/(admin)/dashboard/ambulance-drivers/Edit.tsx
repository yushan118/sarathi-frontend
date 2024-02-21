"use client";

// Importing necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hook";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { deleteDriver, editDriver } from "./server-actions";


// Component for editing an ambulance driver
export default function DriverEdit({
  _id,
  name,
  mobile_number,
}: {
  _id: string;
  name: string;
  mobile_number: string;
}) {

  // State to manage the expanded/collapsed view
  const [expand, setExpand] = useState(false);

  // Zod schema definition for form validation
  const schema = z.object({
    name: z.string(),
    phone_number: z.string().length(10),
  });
  type schemaType = z.infer<typeof schema>;

  // React Hook Form setup for form handling
  const { control, handleSubmit } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name,
      phone_number: mobile_number,
    },
  });

  // useAction hook for handling the editDriver action
  const { execute, status } = useAction(editDriver, {
    onSuccess: () => {
      toast.success("Driver edited successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  // useAction hook for handling the deleteDriver action
  const { execute: executeDelete } = useAction(deleteDriver, {
    onSuccess: () => {
      toast.success("Driver removed successfully!");
      setExpand(false);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return (
    <>

    {/* Row displaying basic driver information, clickable to expand/collapse */}
      <tr className={"cursor-pointer"} onClick={() => setExpand((cur) => !cur)}>
        <td className="pr-8">{name}</td>
        <td>{mobile_number}</td>
      </tr>

      {/* Expanded row with a form for editing the driver details */}
      {expand && (
        <tr>
          <td colSpan={3}>
            <form
              className="mb-4 mt-2 flex w-[200px] flex-col gap-2"
              onSubmit={handleSubmit((data) => {

                // Executing the editDriver action when the form is submitted
                execute({ id: _id, ...data });
              })}
            >

               {/* React Hook Form Controller for the 'name' input field */}
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2">
                    <input
                      {...field}
                      placeholder="Name"
                      className="rounded-sm border border-gray-400 px-2 py-1 outline-none"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* React Hook Form Controller for the 'phone_number' input field */}
              <Controller
                control={control}
                name="phone_number"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2">
                    <input
                      {...field}
                      placeholder="Phone Number"
                      className="rounded-sm border border-gray-400 px-2 py-1 outline-none"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Grid for buttons: Update and Delete */}
              <div className="grid grid-cols-2 gap-2">

                {/* Update button */}
                <button
                  disabled={status == "executing"}
                  className="disabled:text-gray-400"
                >
                  Update
                </button>

                {/* Delete button */}
                <button
                  disabled={status == "executing"}
                  className="disabled:text-gray-400"
                  onClick={() => executeDelete({ id: _id })}
                >
                  Delete
                </button>
              </div>
            </form>
          </td>
        </tr>
      )}
    </>
  );
}
