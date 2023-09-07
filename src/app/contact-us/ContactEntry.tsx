import Image, { StaticImageData } from "next/image";

export default function ContactEntry({
  icon,
  title,
  info,
  info2,
  info3,
}: {
  icon: StaticImageData;
  title: string;
  info: string;
  info2?: string;
  info3?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-300 p-6 shadow-2xl">
      <div className="mb-2 rounded-full border-[3px] border-[#FF0000] p-2">
        <Image
          src={icon}
          width={0}
          height={0}
          sizes="100%"
          alt="icon"
          className="aspect-square h-[35px] w-[35px] object-fill"
        />
      </div>
      <p className="text-center text-xl font-semibold uppercase">{title}</p>
      <p className="mt-2 text-center italic">{info}</p>
      {info2 && <p className="text-center italic">{info2}</p>}
      {info3 && <p className="text-center italic">{info3}</p>}
    </div>
  );
}
