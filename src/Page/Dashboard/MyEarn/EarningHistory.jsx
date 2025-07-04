import { useQuery } from "@tanstack/react-query";
import { startOfDay, startOfWeek, startOfMonth, startOfYear, isAfter } from "date-fns"; import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContex/AuthContext";
import { FaMoneyBillWave, FaUniversity, FaWallet } from 'react-icons/fa';

const EarningHistory = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext)
  const email = user?.email;

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/earning?email=${email}`);
      return res.data;
    },
  });

  const calculateEarning = (parcel) => {
    const cost = (parcel.cost);
    return parcel.senderRegion === parcel.reciverRegion ? cost * 0.6 : cost * 0.4;
  };

  // Filtered earnings
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const monthStart = startOfMonth(now);
  const yearStart = startOfYear(now);

  let total = 0,
    totalCashedOut = 0,
    totalPending = 0,
    today = 0,
    week = 0,
    month = 0,
    year = 0;

  parcels.forEach((p) => {
    const earning = calculateEarning(p);
    const deliveredAt = new Date(p.cashout_at);
    // console.log(deliveredAt);
    total += earning;
    if (p.cashout_status === "cash_out") totalCashedOut += earning;
    else totalPending += earning;

    if (isAfter(deliveredAt, todayStart)) today += earning;
    if (isAfter(deliveredAt, weekStart)) week += earning;
    if (isAfter(deliveredAt, monthStart)) month += earning;
    if (isAfter(deliveredAt, yearStart)) year += earning;
  });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">My Earnings & History</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {/* Total Earning */}
            <div className="bg-green-100 p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:shadow-xl transition duration-300 border-l-4 border-green-500">
              <FaMoneyBillWave className="text-4xl text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-700">Total Earning</h3>
                <p className="text-2xl font-bold text-green-800 mt-1">${total.toFixed(2)}</p>
              </div>
            </div>

            {/* Cash Out */}
            <div className="bg-blue-100 p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:shadow-xl transition duration-300 border-l-4 border-blue-500">
              <FaUniversity className="text-4xl text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-blue-700">Cash Out</h3>
                <p className="text-2xl font-bold text-blue-800 mt-1">${totalCashedOut.toFixed(2)}</p>
              </div>
            </div>

            {/* Balance */}
            <div className="bg-yellow-100 p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:shadow-xl transition duration-300 border-l-4 border-yellow-500">
              <FaWallet className="text-4xl text-yellow-600" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-700">Balance</h3>
                <p className="text-2xl font-bold text-yellow-800 mt-1">${totalPending.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-base-100 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-xl font-bold text-green-700">৳{today.toFixed(2)}</p>
            </div>
            <div className="bg-base-100 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-xl font-bold text-green-700">৳{week.toFixed(2)}</p>
            </div>
            <div className="bg-base-100 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-xl font-bold text-green-700">৳{month.toFixed(2)}</p>
            </div>
            <div className="bg-base-100 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">This Year</p>
              <p className="text-xl font-bold text-green-700">৳{year.toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EarningHistory;