import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
//import { ReactComponent as SriLankaMap } from "../../assets/sri-lanka.svg";

const FarmerHub = ({ userId, userRole }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
  });
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});

  //const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");
  const rawRoles = localStorage.getItem("roles");
  let storedRoles = [];

  try {
    // JSON array එකක් නම් parse කරයි, නැතිනම් error නොවී [] ලබාදෙයි
    storedRoles = rawRoles ? JSON.parse(rawRoles) : [];
  } catch (e) {
    // Array එකක් නොවී සරල String එකක් ලෙස ඇත්නම් (FARMER) එය Array එකක් බවට පත් කරයි
    storedRoles = rawRoles ? [rawRoles] : [];
  }

  const isAuthorized = storedRoles.some(
    (role) =>
      role.toUpperCase() === "FARMER" || role.toUpperCase() === "SUPPLIER",
  );

  const provinces = [
    "Western",
    "Central",
    "Southern",
    "Northern",
    "Eastern",
    "North Western",
    "North Central",
    "Uva",
    "Sabaragamuwa",
  ];
  const getProvinceVotes = (province, totalVotes) => {
    if (!totalVotes) return 0;

    const provinceData = totalVotes[province];
    if (!provinceData) return 0;

    return (
      (provinceData.A || 0) +
      (provinceData.B || 0) +
      (provinceData.C || 0) +
      (provinceData.D || 0)
    );
  };

  const calculateProvinceTotal = (provinceName, provinceWiseData) => {
    if (!provinceWiseData || !provinceWiseData[provinceName]) return 0;

    const votes = provinceWiseData[provinceName];
    // A, B, C, D get mulu votes
    return Object.values(votes).reduce((sum, val) => sum + val, 0);
  };

  // Chart Colors: Modern Green and Blue
  const COLORS = ["#0dc523", "#3b82f6", "#19cd2e", "#3b82f6"];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/mcq/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleCreateQuestion = async () => {
    if (!isAuthorized) return alert("අවසර නැත!");
    const questionData = {
      questionText: newQuestion.text,
      options: newQuestion.options.map((opt, i) => ({
        key: String.fromCharCode(65 + i),
        text: opt,
      })),
      createdBy: userId,
    };
    try {
      await axios.post("http://localhost:8081/api/mcq/questions", questionData);
      fetchQuestions();

      setNewQuestion({
        text: "",
        options: ["", "", "", ""],
      });
      alert("ප්‍රශ්නය සාර්ථකව ඇතුළත් කළා!");
    } catch (err) {
      console.error("Error creating question", err);
    }
  };

  const handleVote = async (qId, optionKey) => {
    const userId = localStorage.getItem("userId");
    console.log("DEBUG userId:", userId); // ADD THIS
    if (!selectedProvince) return alert("කරුණාකර පළාත තෝරන්න!");
    const answerData = {
      questionId: qId,
      userEmail: localStorage.getItem("email"),
      optionSelected: optionKey,
      province: selectedProvince,
    };
    console.log("Sending:", answerData); // ADD THIS
    try {
      await axios.post("http://localhost:8081/api/mcq/answers", answerData);
      fetchQuestions();
    } catch (err) {
      alert("You have already voted! (ඔබ දැනටමත් මනාපය පළ කර ඇත) ");
    }
  };

  const formatTotalVotes = (totalVotes) => {
    if (!totalVotes) return [];
    return [
      { name: " A", votes: totalVotes["A"] || 0 },
      { name: " B", votes: totalVotes["B"] || 0 },
      { name: " C", votes: totalVotes["C"] || 0 },
      { name: " D", votes: totalVotes["D"] || 0 },
    ];
  };

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen font-sans text-slate-800">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2">
          Agrilinker Farmer Hub
        </h1>
        <p className="text-slate-500 font-medium">
          ගොවි සහ සැපයුම්කරුවන් සඳහා වූ විශේෂිත සංසදය
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        {/* 1. Create Question Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-emerald-700 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-800">
                නව විමසුමක් (New query)
              </h2>
            </div>

            {isAuthorized ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    ප්‍රශ්නය / Question
                  </label>
                  <textarea
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-400 transition"
                    rows="3"
                    value={newQuestion.text}
                    placeholder="ඔබේ ප්‍රශ්නය මෙතැන ලියන්න...        . Write your question here"
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, text: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    පිළිතුරු තේරීම් / Answer choices
                  </label>
                  {newQuestion.options.map((_, i) => (
                    <input
                      key={i}
                      className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                      placeholder={`පිළිතුර ${i + 1}`}
                      value={_}
                      onChange={(e) => {
                        let old = [...newQuestion.options];
                        old[i] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: old });
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={handleCreateQuestion}
                  className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Submit Question
                </button>
              </div>
            ) : (
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-red-600 text-sm font-medium">
                  ප්‍රශ්න සෑදිය හැක්කේ ගොවියන්ට හෝ සැපයුම්කරුවන්ට පමණි.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. Vote & Analytics Section */}
        <div className="lg:col-span-8 space-y-8">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-green-200 transition-colors"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-start">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm mr-3 mt-1">
                  Q
                </span>
                {q.questionText}
              </h3>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Voting Form */}
                <div className="space-y-4">
                  <div>
                    <select
                      className="w-full p-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-600 font-medium focus:border-green-400 outline-none transition"
                      onChange={(e) => setSelectedProvince(e.target.value)}
                    >
                      <option value="">
                        Select your region(ඔබේ පළාත තෝරන්න)
                      </option>
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() =>
                          setSelectedOptions({
                            ...selectedOptions,
                            [q.id]: opt.key,
                          })
                        }
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center
                          ${
                            selectedOptions[q.id] === opt.key
                              ? "border-green-500 bg-green-50 ring-2 ring-green-100"
                              : "border-slate-50 bg-slate-50 hover:border-slate-200"
                          }`}
                      >
                        <span
                          className={`font-medium ${selectedOptions[q.id] === opt.key ? "text-green-700" : "text-slate-600"}`}
                        >
                          <span className="opacity-50 mr-2">{opt.key}.</span>{" "}
                          {opt.text}
                        </span>
                        <span className="text-xs font-bold bg-white px-2 py-1 rounded-md shadow-sm text-slate-500">
                          {q.totalVotes?.[opt.key] || 0} votes
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const optionKey = selectedOptions[q.id];
                      if (!optionKey || !selectedProvince)
                        return alert("කරුණාකර සියල්ල සම්පූර්ණ කරන්න!");
                      handleVote(q.id, optionKey);
                    }}
                    className="w-full py-3 bg-emerald-700 text-white rounded-xl font-bold hover:bg-slate-900 transition shadow-md"
                  >
                    Vote Now
                  </button>
                </div>

                {/* Province-wise Chart */}
                <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center min-h-[300px] border border-slate-300">
                  <p className=" font-medium text-black  tracking-widest mb-6 ">
                    Response analysis (ප්‍රතිචාර විශ්ලේෂණය)
                  </p>

                  <div className="w-full h-full ">
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart
                        data={formatTotalVotes(q.totalVotes)}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        {/* Modern Grid Lines */}
                        <CartesianGrid vertical={false} stroke="#e2e8f0" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#94a3b8",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                        />

                        <Bar dataKey="votes" radius={[6, 6, 0, 0]} barSize={35}>
                          {formatTotalVotes(q.totalVotes).map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ),
                          )}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>

                    {/* Small Info Card */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm m-6">
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        {/* Total Votes */}
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-500">
                            Total Votes
                          </span>
                          <span className="text-lg font-bold text-slate-800">
                            {q.totalVotes
                              ? Object.values(q.totalVotes).reduce(
                                  (sum, val) => sum + val,
                                  0,
                                )
                              : 0}
                          </span>
                        </div>

                        {/* Created At */}
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-500">
                            Created At
                          </span>
                          <span className="text-lg font-bold text-slate-800">
                            {new Date(q.createdAt).toLocaleString()}
                          </span>
                        </div>

                        {/* Query Method */}
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-500">
                            Query Method
                          </span>
                          <span className="text-lg font-bold text-slate-800">
                            MCQ Online
                          </span>
                        </div>

                        {/* Sample Info */}
                        <div className="flex flex-col max-w-xs">
                          <span className="text-sm text-slate-500">Sample</span>
                          <span className="text-lg font-bold text-slate-800">
                            Agrilinker users who have verified their email
                            address.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Province Leaderboard Section */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-black uppercase tracking-widest">
                        පළාත් අනුව සහභාගීත්වය (Regional Reach)
                      </h4>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">
                        Live Data
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {provinces.map((p) => {
                        const provinceTotal = calculateProvinceTotal(
                          p,
                          q.provinceWise,
                        );
                        // උපරිම ඡන්ද සංඛ්‍යාව මත පදනම්ව progress bar එකේ දිග තීරණය කිරීමට (උදා: 100 ලෙස ගමු)
                        const progressWidth = Math.min(
                          (provinceTotal / 20) * 100,
                          100,
                        );

                        return (
                          <div
                            key={p}
                            className="bg-slate-50 p-3 rounded-2xl border border-slate-100 transition hover:shadow-sm"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-semibold text-slate-700">
                                {p}
                              </span>
                              <span className="text-sm font-bold text-emerald-600">
                                {provinceTotal} votes
                              </span>
                            </div>
                            {/* Simple Progress Bar */}
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 transition-all duration-500"
                                style={{ width: `${progressWidth}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerHub;
