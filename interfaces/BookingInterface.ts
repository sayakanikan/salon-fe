interface BookingDetail {
  treatment_id: number;
  therapist_id: number;
}

interface BookingRequest {
  id: number;
  location_id: number;
  name: string;
  email: string;
  phone: string;
  details: BookingDetail[];
  date: string;
  time: string;
}

interface BookingResponse {
  id: number;
  location_id: number;
  name: string;
  email: string;
  phone: string;
  details: BookingDetailResponse[];
  date: string;
  time: string;
  total_price: number;
  location: Location;
}

interface BookingDetailResponse {
  treatment_id: number;
  therapist_id: number;
  therapist_price: number;
  treatment_category: string;
  treatment_name: string;
  treatment_price: string;
  therapist_name: string;
}

interface Location {
  id: number;
  name: string;
  phone: string;
  address: string;
}