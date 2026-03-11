import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const complaintOptions = [
  "Wrong product",
  "Scam",
  "Quality issue",
  "Payment issue",
  "Other",
];

const resolutionOptions = ["Refund", "Replace", "Cancel", "Other"];
const contactOptions = ["Email", "Phone"];

const initialFormState = {
  orderId: "",
  complaintType: "",
  resolutionPreference: "",
  contactMethod: "",
  description: "",
};

// uses your new backend route
const MY_TICKETS_ENDPOINT = "/api/support-tickets/my";

const statusStyles = {
  OPEN: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  RESOLVED: "bg-emerald-100 text-emerald-700",
};

const WHATSAPP_NUMBER_DISPLAY = "077 2223723";
const WHATSAPP_WA_ME_LINK = "https://wa.me/94772223723";

export default function SupportPage() {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // buyer message viewing states
  const [myTickets, setMyTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState("");

  const selectedTicket = useMemo(
    () => myTickets.find((t) => t.id === selectedTicketId) || null,
    [myTickets, selectedTicketId],
  );

  const buyerAdminMessages = useMemo(() => {
    const messages = selectedTicket?.messages || [];
    return messages
      .filter(
        (m) =>
          String(m.senderRole || "").toUpperCase() === "ADMIN" &&
          String(m.recipientRole || "").toUpperCase() === "BUYER",
      )
      .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
  }, [selectedTicket]);

  const fetchMyTickets = async () => {
    setTicketsLoading(true);
    setTicketsError("");
    try {
      const res = await api.get(MY_TICKETS_ENDPOINT);
      const tickets = Array.isArray(res.data) ? res.data : [];
      setMyTickets(tickets);

      // auto-select first ticket if none selected
      if (tickets.length && !selectedTicketId) {
        setSelectedTicketId(tickets[0].id);
      }

      // if selected ticket no longer exists, select first
      if (tickets.length && selectedTicketId) {
        const stillExists = tickets.some((t) => t.id === selectedTicketId);
        if (!stillExists) setSelectedTicketId(tickets[0].id);
      }

      //  if no tickets, clear selection
      if (!tickets.length) setSelectedTicketId("");
    } catch (err) {
      console.error(err);
      setTicketsError("Unable to load your support tickets right now.");
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        orderId: formState.orderId.trim(),
        complaintType: formState.complaintType,
        resolutionPreference: formState.resolutionPreference,
        contactMethod: formState.contactMethod,
        description: formState.description.trim(),
        // DO NOT send buyerEmail from frontend (backend sets it from JWT)
      };

      await api.post("/api/support-tickets", payload);

      toast.success("Your complaint has been submitted.");
      setFormState(initialFormState);

      await fetchMyTickets();
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit your complaint right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //  helper: build whatsapp link with a prefilled message
  const getWhatsappLink = (ticket) => {
    const orderId = ticket?.orderId || formState.orderId || "";
    const ticketId = ticket?.id || "";
    const msg = `Hello Support Team,%0A%0AI want to send evidence for my complaint.%0AOrder ID: ${orderId}%0ATicket ID: ${ticketId}%0A%0A(Please find the attached photos/screenshots.)`;
    return `${WHATSAPP_WA_ME_LINK}?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="rounded-3xl bg-gradient-to-r from-green-800 via-green-700 to-green-600 p-8 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-green-100">
            Support Center
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            Report a complaint
          </h1>
          <p className="mt-2 max-w-2xl text-green-100">
            Share issues like wrong products, missing deliveries, or potential
            scams. Our support team will review your request and assist both
            parties.
          </p>
        </header>

        {/* Complaint form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
        >
          <div className="grid gap-6">
            <label className="space-y-2 text-sm font-medium text-gray-700">
              Order or transaction ID
              <input
                type="text"
                name="orderId"
                value={formState.orderId}
                onChange={handleChange}
                placeholder="e.g. ORD-10024"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-gray-700">
              Complaint type
              <select
                name="complaintType"
                value={formState.complaintType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              >
                <option value="">Select an option</option>
                {complaintOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-gray-700">
              Preferred resolution
              <select
                name="resolutionPreference"
                value={formState.resolutionPreference}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              >
                <option value="">Select an option</option>
                {resolutionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-gray-700">
              Contact method
              <select
                name="contactMethod"
                value={formState.contactMethod}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              >
                <option value="">Select an option</option>
                {contactOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-gray-700">
              What happened?
              <textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us what went wrong and what resolution you need."
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              />
            </label>

            {/* Evidence / WhatsApp section */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-800">
                Need to send evidence?
              </p>
              <p className="mt-1 text-sm text-green-700">
                Please send photos, screenshots, invoices, or any proof related
                to your complaint via WhatsApp to{" "}
                <span className="font-semibold">{WHATSAPP_NUMBER_DISPLAY}</span>.
              </p>

              <a
                href={getWhatsappLink(null)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Send Evidence via WhatsApp
              </a>

              <p className="mt-2 text-xs text-green-600">
                Tip: Mention your Order ID (and later your Ticket ID after you
                submit).
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit complaint"}
            </button>
            <p className="text-sm text-gray-500">
              We’ll update you when the ticket status changes.
            </p>
          </div>
        </form>

        {/* Buyer can view admin messages */}
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Your tickets & admin replies
            </h2>
            <button
              type="button"
              onClick={fetchMyTickets}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Refresh
            </button>
          </div>

          {ticketsError ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {ticketsError}
            </div>
          ) : null}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            {/* Ticket list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Tickets</p>
                <span className="text-xs text-gray-500">
                  {ticketsLoading ? "Loading..." : `${myTickets.length} total`}
                </span>
              </div>

              {ticketsLoading ? (
                <p className="text-sm text-gray-500">Loading your tickets...</p>
              ) : myTickets.length ? (
                myTickets.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${selectedTicketId === t.id
                      ? "border-green-300 bg-green-50"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-500">
                          {t.orderId || "Order not provided"}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {t.complaintType || "Complaint"}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[t.status] || "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {String(t.status || "OPEN").replace("_", " ")}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {t.description}
                    </p>
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  You haven’t submitted any complaints yet.
                </p>
              )}
            </div>

            {/* Messages */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                  Admin messages
                </p>

                {/*  evidence button for selected ticket */}
                {selectedTicket ? (
                  <a
                    href={getWhatsappLink(selectedTicket)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700"
                    title="Send photos/screenshots as evidence via WhatsApp"
                  >
                    Send Evidence
                  </a>
                ) : null}
              </div>

              {selectedTicket ? (
                <div className="space-y-3">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                    <p className="text-xs font-semibold uppercase text-gray-400">
                      Ticket ID: {selectedTicket.id}
                    </p>
                    <p className="mt-2 font-medium text-gray-900">
                      {selectedTicket.complaintType}
                    </p>
                    <p className="mt-1 text-gray-600">
                      {selectedTicket.orderId || "Order not provided"}
                    </p>
                  </div>

                  {buyerAdminMessages.length ? (
                    buyerAdminMessages.map((m) => (
                      <div
                        key={m.id || `${m.createdAt}-${m.message}`}
                        className="rounded-2xl border border-gray-100 p-4 text-sm text-gray-800"
                      >
                        <p className="text-xs font-semibold uppercase text-gray-400">
                          ADMIN → BUYER
                        </p>
                        <p className="mt-2">{m.message}</p>
                        <p className="mt-2 text-xs text-gray-400">
                          {m.createdAt
                            ? new Date(m.createdAt).toLocaleString()
                            : ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No admin messages yet for this ticket.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Select a ticket to view admin replies.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
