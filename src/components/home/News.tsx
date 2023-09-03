import Image from "next/image";
import LatestNews1Image from "@/../public/images-temp/latest-news/news-1.jpeg";
import LatestNews2Image from "@/../public/images-temp/latest-news/news-2.jpeg";
import LatestNews3Image from "@/../public/images-temp/latest-news/news-3.jpeg";
import LatestNewsCoverImage from "@/../public/images-temp/latest-news/cover.jpeg";
import Actions from "./Actions";

function NewsEntry(props: {
  image: string;
  title: string;
  shortInfo: string;
  date: Date;
}) {
  return (
    <div className="flex items-center justify-center gap-6">
      <Image
        src={props.image}
        alt={props.title}
        width={0}
        height={0}
        sizes={"100%"}
        className="aspect-video h-auto w-[240px] rounded-2xl object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),_0px_4px_4px_0px_rgba(0,0,0,0.25),_0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      />
      <div className="text-sm">
        <h2 className="font-bold">{props.title}</h2>
        <p className="font-light">{props.shortInfo}</p>
        <p className="mt-2 text-xs font-semibold">
          {props.date.toDateString()}
        </p>
      </div>
    </div>
  );
}

function LatestNews() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex w-max flex-col items-center justify-center">
        <h1 className="text-2xl font-thin">Our Latest News</h1>
        <div className="block h-[6px] w-[90%] bg-[#FF5C00D4] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="flex flex-col items-center gap-6">
        <NewsEntry
          image={LatestNews1Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="simply dummy text of the printing.text of the printing.text of the printing."
          date={new Date("2023-01-01")}
        />
        <NewsEntry
          image={LatestNews2Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="simply dummy text of the printing.text of the printing.text of the printing."
          date={new Date("2023-01-01")}
        />
        <NewsEntry
          image={LatestNews3Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="simply dummy text of the printing.text of the printing.text of the printing."
          date={new Date("2023-01-01")}
        />
        <button className="w-max rounded-2xl bg-[#DC0000] px-7 py-1 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          View More
        </button>
      </div>
    </div>
  );
}

function NewsCoverImage() {
  return (
    <div className="mt-10 basis-[60%]">
      <Image src={LatestNewsCoverImage} alt="News Cover" />
    </div>
  );
}

export default async function News() {
  return (
    <div className="flex flex-col-reverse items-start justify-center gap-10 lg:flex-row">
      <div className="flex flex-col gap-6">
        <Actions />
        <LatestNews />
      </div>
      <NewsCoverImage />
    </div>
  );
}
