const StatusDisplay = ({ status }) => {
  const getColor = () => {
    switch (status?.toLowerCase()) {
      case "not started":
        return "bg-gray-400";
      case "paused":
        return "bg-red-600";
      case "in progress":
        return "bg-blue-600";
      case "testing":
        return "bg-purple-600";
      case "deployment":
        return "bg-yellow-600";
      case "done":
        return "bg-green-600";
      default:
        return "bg-gray-300";
    }
  };

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const displayStatus = capitalizeWords(status || "");

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getColor()}`}
    >
      {displayStatus}
    </span>
  );
};

export default StatusDisplay;
