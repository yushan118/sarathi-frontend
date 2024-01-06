import News from "@/components/home/News";
import SuspendNotice from "./SuspendNotice";

export default function Home() {
  return (
    <main className="container pb-8 pt-2 lg:py-8">
      <SuspendNotice />
      <News />
    </main>
  );
}
