"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hook";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createDriver } from "./server-actions";
import { toast } from "react-toastify";

export default function CreateDriver() {
  const [showForm, setShowForm] = useState(false);
  const schema = z.object({
    name: z.string(),
    phone_number: z.string().length(10),
  });
  type schemaType = z.infer<typeof schema>;
  const { control, handleSubmit } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const { execute, status } = useAction(createDriver, {
    onSuccess: () => {
      toast.success("New driver created successfully!");
      setShowForm(false);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return (
    <div className="mb-4">
      <button onClick={() => setShowForm(true)}>Add a driver</button>
      {showForm && (
        <form
          className="mt-2 flex w-[200px] flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            execute(data);
          })}
        >
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
