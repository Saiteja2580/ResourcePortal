import React from "react";

interface FacultyBookingEditProps {
  params: {
    bookingId: string;
  };
}

const FacultyBookingEdit = ({ params }: FacultyBookingEditProps) => {
  return <div>FacultyBookingEdit:{params.bookingId}</div>;
};

export default FacultyBookingEdit;
