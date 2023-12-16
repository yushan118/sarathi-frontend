import BookingsList from "../BookingsList";

export default function PhoneBookingsPage({
  params,
}: {
  params: { phone: string };
}) {
  return (
    <div className="mx-auto py-8">
      <BookingsList phone={params.phone} />
    </div>
  );
}
