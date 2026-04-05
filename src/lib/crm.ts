/**
 * CRM Integration — sends website leads to the Franchise Expo CRM.
 * Posts to a dedicated /api/v1/website-leads endpoint (separate from bot/visitors).
 */

const CRM_API_URL = process.env.CRM_API_URL || "";
const CRM_API_KEY = process.env.CRM_API_KEY || "";

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  formType: string;
}

export async function sendLeadToCrm(data: LeadData): Promise<boolean> {
  if (!CRM_API_URL || !CRM_API_KEY) return false;

  try {
    const res = await fetch(`${CRM_API_URL}/api/v1/website-leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRM_API_KEY}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        company: data.company || "",
        subject: data.subject || "",
        message: data.message,
        form_type: data.formType,
        source: "ufa_website",
      }),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch {
    console.error("[CRM] Failed to send lead");
    return false;
  }
}
