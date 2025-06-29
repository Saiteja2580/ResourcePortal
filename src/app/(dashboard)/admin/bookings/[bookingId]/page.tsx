import React from "react";

interface BookingDetailsProps {
  params: {
    bookingId: string;
  };
}

const BookingDetails = ({ params }: BookingDetailsProps) => {
  return <div>BookingDetails : {params.bookingId}</div>;
};

export default BookingDetails;
