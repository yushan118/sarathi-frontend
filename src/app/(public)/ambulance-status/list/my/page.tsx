// Importing the BookingsList component from the specified file
import BookingsList from "../BookingsList";

// MyBookingsPage component definition
export default function MyBookingsPage() {
  return (

    // Container with margin, padding, and centered content vertically
    <div className="mx-auto py-8">

      {/* Rendering the BookingsList component */}
      <BookingsList />
    </div>
  );
}
