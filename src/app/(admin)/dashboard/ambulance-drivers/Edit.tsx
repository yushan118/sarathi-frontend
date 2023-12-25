"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hook";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { deleteDriver, editDriver } from "./server-actions";

export default function DriverEdit({
  _id,
  name,
  mobile_number,
}: {
  _id: string;
  name: string;
  mobile_number: string;
}) {
  const [expand, setExpand] = useState(false);

  const schema = z.object({
    name: z.string(),
    phone_number: z.string().length(10),
  });
  type schemaType = z.infer<typeof schema>;
  const { control, handleSubmit } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name,
      phone_number: mobile_number,
    },
  });

  const { execute, status } = useAction(editDriver, {
    onSuccess: () => {
      toast.success("Driver edited successfully!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

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
      <li className="cursor-pointer" onClick={() => setExpand((cur) => !cur)}>
        {name} - {mobile_number}
      </li>
      {expand && (
        <form
          className="mb-4 mt-2 flex w-[200px] flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            execute({ id: _id, ...data });
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
          <div className="grid grid-cols-2 gap-2">
            <button
              disabled={status == "executing"}
              className="disabled:text-gray-400"
            >
              Update
            </button>
            <button
              disabled={status == "executing"}
              className="disabled:text-gray-400"
              onClick={() => executeDelete({ id: _id })}
            >
              Delete
            </button>
          </div>
        </form>
      )}
    </>
  );
}
