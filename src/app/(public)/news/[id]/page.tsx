import LatestNews1Image from "@/../public/images-temp/latest-news/news-1.jpeg";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function NewsPage() {
  return (
    <main className="container lg:py-4">
      <Link
        href="/news"
        className="flex w-max items-center gap-1 hover:underline"
      >
        <IoIosArrowBack />
        Back to all news
      </Link>

      <h1 className="text-4xl font-bold">Lorem Ipsum Lorem Ipsum</h1>
      <p>Oct 1 2023</p>

      <Image
        src={LatestNews1Image}
        alt="News"
        width={800}
        className="mx-auto"
      />

      <div className="mt-8 flex flex-col gap-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus
          malesuada sagittis. Mauris ut pellentesque orci, vel pretium elit.
          Donec mattis felis ut dui aliquam, eget molestie quam euismod.
          Vestibulum nisi neque, porttitor at dignissim sed, consequat imperdiet
          dui. Vestibulum tincidunt sem lobortis felis pulvinar porta. Morbi et
          metus maximus, ultrices nisi eu, maximus sapien. Integer cursus libero
          quam, eu dictum ex tincidunt et.
        </p>
        <p>
          Sed suscipit quam sed sem venenatis luctus. Proin pellentesque dapibus
          risus, et dictum risus egestas nec. Morbi sed ipsum magna. Nam dapibus
          in nunc at luctus. Suspendisse nec elit lectus. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Nulla ultricies posuere tellus, at dapibus ligula mollis
          eget. In a mi risus. Aliquam convallis, risus ut commodo gravida,
          lacus sapien gravida urna, id ultrices erat sem ut nisi. Phasellus
          tellus libero, vulputate nec turpis finibus, sodales fringilla nibh.
          Cras ultricies sodales interdum.
        </p>
        <p>
          Suspendisse blandit consectetur imperdiet. Vivamus lobortis auctor
          pellentesque. Pellentesque et mauris vitae augue posuere cursus eu
          ullamcorper sem. Duis quis dignissim lorem, non eleifend quam.
          Pellentesque sed ex blandit erat dictum pellentesque. Maecenas
          interdum, dolor in molestie laoreet, leo erat tristique lectus, in
          varius diam eros tempus risus. Proin varius purus quis mattis tempus.
          Maecenas ut pharetra tortor, vel accumsan ante. Ut tempus libero et
          tempor commodo. Vivamus hendrerit nisl lectus. Phasellus faucibus at
          est eget tempus. Aenean porttitor iaculis erat eget vulputate. Integer
          euismod, neque quis dapibus commodo, massa ante scelerisque justo, nec
          lacinia mi diam vitae lacus. Phasellus id convallis velit, ut vehicula
          libero. Vestibulum vehicula, magna ac fringilla ornare, turpis elit
          imperdiet massa, eu elementum turpis leo vel metus. Vivamus quis neque
          tellus.
        </p>
        <p>
          Nunc blandit id orci non condimentum. Suspendisse ultricies tristique
          felis, vel pharetra metus accumsan nec. Quisque tincidunt diam eget
          sapien gravida, non aliquet felis viverra. Fusce vitae aliquam ipsum,
          non pretium augue. Etiam lectus urna, vulputate eget purus eget,
          hendrerit lacinia odio. Etiam sollicitudin at neque at imperdiet.
          Curabitur eros ex, posuere nec massa vel, tincidunt dapibus libero. In
          sed ligula magna. Donec efficitur sapien sed quam placerat, in
          ultrices urna congue. Fusce sit amet commodo justo. Aenean ac lacus
          vitae ligula consectetur elementum et id sapien. Phasellus aliquet sem
          vulputate mauris sollicitudin scelerisque. Ut nunc ipsum, sagittis id
          eros ultrices, vestibulum hendrerit leo. Sed posuere, purus vitae
          sodales rutrum, eros diam bibendum nunc, varius lacinia tortor sapien
          eu sapien. Sed varius est in lacus consectetur mollis. Morbi id
          maximus justo.
        </p>
        <p>
          Nulla tempor elementum nisl vitae ultrices. Pellentesque porttitor
          nulla lorem, vel blandit nisl commodo vel. Phasellus ut neque et
          turpis hendrerit auctor sed vitae purus. Donec id turpis et odio
          venenatis ultrices. Donec consectetur convallis nisi at imperdiet.
          Proin felis arcu, tincidunt in commodo vitae, vehicula non ex. Duis
          non sapien justo. Nulla condimentum volutpat venenatis. Duis bibendum
          tristique congue. Nullam interdum blandit risus, quis lacinia arcu
          rutrum vitae. Nunc maximus a lorem ac rhoncus.
        </p>
      </div>

      <div className="mb-4 mt-8">
        <p>Published on: 28th Nov 2023</p>
        <p>Last edited on: 1st Oct 2023</p>
      </div>
    </main>
  );
}
