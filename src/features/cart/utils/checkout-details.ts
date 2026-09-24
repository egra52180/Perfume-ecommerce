export type CheckoutDetails = {
  recipientName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  note: string;
  paymentMethod: "card" | "cash";
};

const STORAGE_KEY = "odoratus-checkout-details";

export function readCheckoutDetails(): CheckoutDetails | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as CheckoutDetails) : null;
  } catch {
    return null;
  }
}

export function saveCheckoutDetails(details: CheckoutDetails): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
}
