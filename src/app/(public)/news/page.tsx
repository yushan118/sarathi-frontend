// Importing NoImage placeholder image and NewsEntry component
import NoImage from "@/../public/images/no-image.jpg";
import { NewsEntry } from "@/components/home/News";

// Importing Suspense from React for code-splitting
import { Suspense } from "react";

// Async function to fetch and display a list of news entries
async function List() {
  const newsRes = await fetch("https://aponekhabar.com/api/v2/auth/news/tourism"); // Fetching news data from the API
  let newsJson: {
    _id: string;
    title: string;
    description: string;
    src: string;
  }[];
  try {
    // Parsing the JSON response and mapping it to a new format
    newsJson = await newsRes.json().then((j) => j.map((e: any, idx: number) => ({ _id: idx, title: e.titletaja, description: e.parataja, src: e.imagetaja })));
  } catch {

    // Displaying an error message if there is an issue fetching or parsing news data
    return <p>Could not load the news</p>;
  }


// Mapping the news entries to NewsEntry components
  return newsJson.map((news) => (
    <NewsEntry
      key={news._id}
      image={NoImage.src} // Using the NoImage placeholder for news entries without an image
      title={news.title}
      shortInfo={news.description}
    />
  ));
}

// Functional component for the NewsPage
export default function NewsPage() {
  return (
    <main className="container lg:py-4">
      <h1 className="mb-4 text-4xl font-semibold">All News</h1>
      <div className="flex flex-col items-start gap-6">

        {/* Using Suspense for code-splitting and showing a loading spinner while fetching data */}
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

          {/* Rendering the List component within Suspense */}
          <List />
        </Suspense>
      </div>
    </main>
  );
}
