import Nav from "../{components}/Nav";
import TicketCard from "../{components}/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to fetch tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <div>
      <Nav />
      <div className="p-5">
        <div>
          {tickets &&
            uniqueCategories?.map((uniqueCategories, categoryIndex) => (
              <div key={categoryIndex} className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{uniqueCategories}</h2>
                <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                  {tickets
                    .filter((ticket) => ticket.category === uniqueCategories)
                    .sort((a, b) => b.priority - a.priority)
                    .map((filteredTicket, _index) => (
                      <TicketCard
                        id={_index}
                        key={_index}
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
