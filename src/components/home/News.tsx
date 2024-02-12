import Image from "next/image";
import NoImage from "@/../public/images/no-image.jpg";
import LatestNewsCoverImage from "@/../public/images-temp/latest-news/cover.jpeg";
import Actions from "./Actions";
import Link from "next/link";
import { Suspense } from "react";

export function NewsEntry(props: {
  image: string;
  title: string;
  shortInfo: string;
  date: Date;
}) {
  return (
    <div className="text-sm">
      <h2 className="font-bold">{props.title}</h2>
      <p className="font-light">{props.shortInfo}</p>
      <p className="mt-2 text-xs font-semibold">{props.date.toDateString()}</p>
    </div>
  );
}

function LatestNewsDiv() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex w-max flex-col items-center justify-center">
        <h1 className="text-2xl font-thin">Our Latest News</h1>
        <div className="block h-[6px] w-[90%] bg-[#FF5C00D4] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="flex flex-col gap-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-4">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          }
        >
          <LatestNews />
        </Suspense>
        <Link href="/news" className="mx-auto">
          <button className="w-max rounded-2xl bg-[#DC0000] px-7 py-1 text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
}

async function LatestNews() {
  const newsRes = await fetch("https://202.53.1.154/news");
  let newsJson: {
    _id: string;
    title: string;
    description: string;
    pub_date: string;
  }[];
  try {
    newsJson = await newsRes.json().then((j) => j.news);
  } catch {
    return <p>Could not load the news</p>;
  }

  return newsJson
    .slice(0, 4)
    .map((news) => (
      <NewsEntry
        key={news._id}
        image={NoImage.src}
        title={news.title}
        shortInfo={news.description}
        date={new Date(news.pub_date)}
      />
    ));
}

function NewsCoverImage() {
  return (
    <div className="mt-10 basis-[60%]">
      <Image src={LatestNewsCoverImage} alt="News Cover" />
    </div>
  );
}

export default async function News() {
  const bookingsList = await fetch(`${process.env.API_URL}/bookings/all`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return (
    <div className="flex flex-col-reverse items-start justify-center gap-10 lg:flex-row">
      <div className="flex flex-col gap-6">
        <Actions bookingsList={bookingsList} />
        <LatestNewsDiv />
      </div>
      <NewsCoverImage />
    </div>
  );
}
