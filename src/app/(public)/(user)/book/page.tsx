// Importing the BookAnAmbulance component
import BookAnAmbulance from "./BookAnAmbulance";

// Functional component for the BookPage
export default function BookPage() {
  return (

    // Main container for the BookPage
    <main className="container pb-8 pt-2 lg:py-8">

      {/* Rendering the BookAnAmbulance component */}
      <BookAnAmbulance />
    </main>
  );
}
