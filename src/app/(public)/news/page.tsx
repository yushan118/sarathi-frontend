import LatestNews1Image from "@/../public/images-temp/latest-news/news-1.jpeg";
import LatestNews2Image from "@/../public/images-temp/latest-news/news-2.jpeg";
import LatestNews3Image from "@/../public/images-temp/latest-news/news-3.jpeg";
import { NewsEntry } from "@/components/home/News";

export default function NewsPage() {
  return (
    <main className="container lg:py-4">
      <h1 className="mb-4 text-4xl font-semibold">All News</h1>
      <div className="flex flex-col items-start gap-6">
        <NewsEntry
          image={LatestNews1Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium elit."
          date={new Date("2023-01-01")}
        />
        <NewsEntry
          image={LatestNews2Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium elit."
          date={new Date("2023-01-01")}
        />
        <NewsEntry
          image={LatestNews3Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium elit."
          date={new Date("2023-01-01")}
        />
        <NewsEntry
          image={LatestNews1Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium elit."
          date={new Date("2023-01-01")}
        />
        <NewsEntry
          image={LatestNews2Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium elit."
          date={new Date("2023-01-01")}
        />
        <NewsEntry
          image={LatestNews3Image.src}
          title="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          shortInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium elit."
          date={new Date("2023-01-01")}
        />
      </div>
    </main>
  );
}
