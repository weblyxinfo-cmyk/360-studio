// GoPay REST API wrapper
// Docs: https://doc.gopay.com/

const SANDBOX_URL = "https://gw.sandbox.gopay.com";
const PRODUCTION_URL = "https://gate.gopay.cz";

function getBaseUrl(): string {
  return process.env.GOPAY_IS_SANDBOX === "true" ? SANDBOX_URL : PRODUCTION_URL;
}

// Token cache
let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const clientId = process.env.GOPAY_CLIENT_ID!;
  const clientSecret = process.env.GOPAY_CLIENT_SECRET!;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${getBaseUrl()}/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body: "grant_type=client_credentials&scope=payment-create",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GoPay OAuth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000; // refresh 60s before expiry
  return cachedToken!;
}

interface CreatePaymentParams {
  amount: number; // in hellers (CZK * 100)
  currency?: string;
  orderNumber: string;
  description: string;
  returnUrl: string;
  notifyUrl: string;
  payerEmail: string;
  payerFirstName?: string;
  payerLastName?: string;
}

interface GopayPaymentResponse {
  id: number;
  gw_url: string;
  state: string;
}

export async function createPayment(params: CreatePaymentParams): Promise<GopayPaymentResponse> {
  const token = await getAccessToken();
  const goId = process.env.GOPAY_GO_ID!;

  const body = {
    payer: {
      default_payment_instrument: "PAYMENT_CARD",
      allowed_payment_instruments: ["PAYMENT_CARD", "BANK_ACCOUNT", "GPAY", "APPLE_PAY"],
      contact: {
        email: params.payerEmail,
        ...(params.payerFirstName && { first_name: params.payerFirstName }),
        ...(params.payerLastName && { last_name: params.payerLastName }),
      },
    },
    amount: params.amount,
    currency: params.currency || "CZK",
    order_number: params.orderNumber,
    order_description: params.description,
    items: [
      {
        type: "ITEM",
        name: params.description,
        amount: params.amount,
        count: 1,
      },
    ],
    callback: {
      return_url: params.returnUrl,
      notification_url: params.notifyUrl,
    },
    target: {
      type: "ACCOUNT",
      goid: Number(goId),
    },
    lang: "CS",
  };

  const res = await fetch(`${getBaseUrl()}/api/payments/payment`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GoPay create payment failed: ${res.status} ${text}`);
  }

  return res.json();
}

interface GopayPaymentStatus {
  id: number;
  state: string;
  amount: number;
  currency: string;
  order_number: string;
  payer: {
    contact: {
      email: string;
    };
  };
}

export async function getPaymentStatus(paymentId: string): Promise<GopayPaymentStatus> {
  const token = await getAccessToken();

  const res = await fetch(`${getBaseUrl()}/api/payments/payment/${paymentId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GoPay get status failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function refundPayment(paymentId: string, amount: number): Promise<void> {
  const token = await getAccessToken();

  const res = await fetch(`${getBaseUrl()}/api/payments/payment/${paymentId}/refund`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body: `amount=${amount}`,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GoPay refund failed: ${res.status} ${text}`);
  }
}
