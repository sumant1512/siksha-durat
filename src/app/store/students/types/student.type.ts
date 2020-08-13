export interface ProfileType {
  userDetails: UserDetailsType;
  email: string;
  students: string;
}

export interface UserDetailsType {
  user_id: number;
  school_name: string;
  admin_name: string;
  aadhar_number: string;
  school_registration_no: string;
  admin_contact_no: string;
  school_contact_no: string;
  admin_profile_picture: string;
  school_cover_image: string;
  created_on: string;
  last_updated_on: string;
  address: string;
}