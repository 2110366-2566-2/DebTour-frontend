export interface AgencyType {
  agencyName: string;
  approveTime: string;
  authorizeAdminUsername: string;
  authorizeStatus: string;
  bankAccount: string;
  bankName: string;
  email: string;
  image: string;
  licenseNo: string;
  phone: string;
  role: string;
  username: string;
}

export interface AgencyTransactionType {
  amount: number;
  method: string;
  status: string;
  stripeID: string;
  timestamp: string;
  tourId: string | number;
  touristUsername: string;
  transactionId: string | number;
}
