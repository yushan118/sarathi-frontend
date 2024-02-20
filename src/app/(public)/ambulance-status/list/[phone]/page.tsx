// Importing the BookingsList component from the specified file
import BookingsList from "../BookingsList";

// PhoneBookingsPage component definition
export default function PhoneBookingsPage({
  params,
}: {
  params: { phone: string };
}) {
  return (

    // Container with margin, padding, and centered content vertically
    <div className="mx-auto py-8">

       {/* Rendering the BookingsList component with the 'phone' parameter */}
      <BookingsList phone={params.phone} />
    </div>
  );
}
