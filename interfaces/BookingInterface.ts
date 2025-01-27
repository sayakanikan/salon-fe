interface BookingDetail {
  treatment_id: number;
  therapist_id: number;
}

interface BookingRequest {
  location_id: number;
  name: string;
  email: string;
  phone: string;
  details: BookingDetail[];
  date: string;
  time: string;
}