import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

const onlyDigits = (s = "") => (s || "").replace(/\D/g, "");

const formatCardNumber = (value) => {
  const digits = onlyDigits(value).slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value) => {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const detectBrand = (n) => {
  if (!n) return "CARD";
  if (/^4/.test(n)) return "VISA";
  if (/^(5[1-5])/.test(n) || /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(n)) return "MC";
  if (/^(34|37)/.test(n)) return "AMEX";
  if (/^(6011|65|64[4-9])/.test(n)) return "DISC";
  return "CARD";
};

const luhnCheck = (num) => {
  const digits = num.split("").map((x) => parseInt(x, 10));
  if (digits.some((x) => Number.isNaN(x))) return false;
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let v = digits[i];
    if (dbl) {
      v *= 2;
      if (v > 9) v -= 9;
    }
    sum += v;
    dbl = !dbl;
  }
  return sum % 10 === 0;
};

const validExpiry = (mmYY) => {
  const [mm, yy] = (mmYY || "").split("/");
  if (!mm || !yy) return false;
  const m = parseInt(mm, 10);
  const y = parseInt(yy, 10);
  if (Number.isNaN(m) || Number.isNaN(y)) return false;
  if (m < 1 || m > 12) return false;

  const now = new Date();
  const curYY = now.getFullYear() % 100;
  const curMM = now.getMonth() + 1;
  if (y < curYY) return false;
  if (y === curYY && m < curMM) return false;
  return true;
};

export default function PremiumPaymentModal({ open, totalAmount, loading, onClose, onPay }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [touched, setTouched] = useState({});

  const digits = useMemo(() => onlyDigits(cardNumber), [cardNumber]);
  const brand = useMemo(() => detectBrand(digits), [digits]);

  const errors = useMemo(() => {
    const e = {};
    if (!digits) e.cardNumber = "Card number is required";
    else if (digits.length < 13) e.cardNumber = "Card number is too short";
    else if (!luhnCheck(digits)) e.cardNumber = "Invalid card number";

    if (!expiry) e.expiry = "Expiry is required";
    else if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = "Use MM/YY format";
    else if (!validExpiry(expiry)) e.expiry = "Card expired";

    const cvvDigits = onlyDigits(cvv);
    const cvvLen = brand === "AMEX" ? 4 : 3;
    if (!cvvDigits) e.cvv = "CVV is required";
    else if (cvvDigits.length !== cvvLen) e.cvv = `CVV must be ${cvvLen} digits`;

    return e;
  }, [digits, expiry, cvv, brand]);

  const canPay = useMemo(() => Object.keys(errors).length === 0 && !loading, [errors, loading]);

  if (!open) return null;

  const touchAll = () => setTouched({ cardNumber: true, expiry: true, cvv: true });

  const handlePay = () => {
    touchAll();
    if (!canPay) {
      toast.error("Fix card details first.");
      return;
    }
    onPay(); // your CheckoutPage will call processOrder("PAID")
  };

  const showErr = (key) => touched[key] && errors[key];

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Card Payment</h2>
        <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-widest">
          Secure Mock Transaction
        </p>

        {/* Premium preview */}
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl text-white mb-8 shadow-xl relative overflow-hidden">
          <p className="text-[10px] font-bold opacity-60 mb-1">PAYABLE AMOUNT</p>
          <p className="text-3xl font-black mb-6">Rs. {Number(totalAmount || 0).toFixed(2)}</p>
          <div className="flex justify-between items-end">
            <p className="text-sm tracking-widest font-mono">
              {digits ? formatCardNumber(digits) : "•••• •••• •••• ••••"}
            </p>
            <div className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">{brand}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              onBlur={() => setTouched((p) => ({ ...p, cardNumber: true }))}
              placeholder="Card Number"
              inputMode="numeric"
              className={`w-full p-4 rounded-xl outline-none transition-all border ${
                showErr("cardNumber") ? "border-red-400" : "border-gray-200"
              } focus:ring-2 focus:ring-green-500`}
            />
            {showErr("cardNumber") && <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>}
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                onBlur={() => setTouched((p) => ({ ...p, expiry: true }))}
                placeholder="MM/YY"
                inputMode="numeric"
                className={`w-full p-4 rounded-xl outline-none transition-all border ${
                  showErr("expiry") ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-green-500`}
              />
              {showErr("expiry") && <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(onlyDigits(e.target.value).slice(0, brand === "AMEX" ? 4 : 3))}
                onBlur={() => setTouched((p) => ({ ...p, cvv: true }))}
                placeholder="CVV"
                inputMode="numeric"
                className={`w-full p-4 rounded-xl outline-none transition-all border ${
                  showErr("cvv") ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-green-500`}
              />
              {showErr("cvv") && <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={!canPay}
          className={`w-full py-4 rounded-2xl mt-8 font-bold text-lg shadow-lg transition-all ${
            canPay ? "bg-green-600 hover:bg-green-700 text-white shadow-green-200" : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : "Verify & Pay"}
        </button>

        <button
          onClick={onClose}
          className="w-full py-3 mt-2 text-gray-400 hover:text-gray-600 font-medium transition-colors text-sm"
          disabled={loading}
        >
          Return to Checkout
        </button>

        <p className="text-[11px] text-gray-500 text-center mt-4">
          🔒 This is a mock payment. Card details are not stored.
        </p>
      </div>
    </div>
  );
}
