"use client";

// Importing necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hook";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createDriver } from "./server-actions";
import { toast } from "react-toastify";

// Component for creating a new ambulance driver
export default function CreateDriver() {

  // State to manage the visibility of the form
  const [showForm, setShowForm] = useState(false);

  // Zod schema definition for form validation
  const schema = z.object({
    name: z.string(),
    phone_number: z.string().length(10),
  });
  type schemaType = z.infer<typeof schema>;

  // React Hook Form setup for form handling
  const { control, handleSubmit } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  // useAction hook for handling the createDriver action
  const { execute, status } = useAction(createDriver, {
    onSuccess: () => {

      // Show success toast and hide the form
      toast.success("New driver created successfully!");
      setShowForm(false);
    },
    onError: () => {

      // Show error toast
      toast.error("Something went wrong!");
    },
  });

  return (
    <div className="mb-4">

      {/* Button to toggle the visibility of the form */}
      <button onClick={() => setShowForm(true)}>Add a driver</button>

      {/* Form for adding a new driver, visible when showForm is true */}
      {showForm && (
        <form
          className="mt-2 flex w-[200px] flex-col gap-2"
          onSubmit={handleSubmit((data) => {

             // Executing the createDriver action when the form is submitted
            execute(data);
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

          {/* Button for submitting the form */}
          <button
            disabled={status == "executing"}
            className="disabled:text-gray-400"
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
}
