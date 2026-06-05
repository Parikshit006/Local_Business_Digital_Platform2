import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasCalled = useRef(false); // ✅ prevents double call

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (hasCalled.current) return; // 🚀 STOP second call
    hasCalled.current = true;

    const verify = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        await axios.get(`${apiUrl}/auth/verify-email/${token}`);

        setStatus("success");

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">

        {status === "loading" && <h2>Verifying...</h2>}
        {status === "success" && <h2>Email Verified ✅</h2>}
        {status === "error" && <h2>Invalid or expired link ❌</h2>}

      </div>
    </div>
  );
}