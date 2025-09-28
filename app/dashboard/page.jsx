// app/Dashboard/page.jsx (or wherever this is)
import Nav from "../{components}/Nav";
import TicketCard from "../{components}/TicketCard";
import { getServerSession } from "next-auth"; // 👈 import this
import { authOptions } from "../api/auth/[...nextauth]/route"; // 👈 adjust path if needed

const getTickets = async (userEmail) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/Tickets?userEmail=${userEmail}`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    console.log("Failed to fetch tickets", error);
  }
};

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return <p className="p-5">Please log in to view your tickets.</p>;
  }

  const { tickets } = await getTickets(userEmail);

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div>
      <Nav />
      <div className="p-5">
        <div>
          {tickets &&
            uniqueCategories?.map((uniqueCategory, categoryIndex) => (
              <div key={categoryIndex} className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{uniqueCategory}</h2>
                <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                  {tickets
                    .filter((ticket) => ticket.category === uniqueCategory)
                    .sort((a, b) => b.priority - a.priority)
                    .map((filteredTicket, _index) => (
                      <TicketCard
                        id={_index}
                        key={filteredTicket._id}
                        ticket={filteredTicket}
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
