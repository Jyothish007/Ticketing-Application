"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Nav from "./Nav";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const userEmail = session?.user.email;
      const res = await fetch("/api/Tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userEmail }),
      });
      if (!res.ok) {
        setIsLoading(false);
        throw new Error("Failed to create ticket");
      }
    }
    router.refresh();
    router.push("/");
  };

  const startingTicketData = {
    title: "",
    description: "",
    category: "",
    priority: 1,
    progress: 0,
    status: "not started",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["category"] = ticket.category;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
  }

  const [formData, setFormData] = useState(startingTicketData);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Nav />
      <div className="flex justify-center p-4 bg-gray-50">
        <form
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6"
          onSubmit={handleSubmit}
        >
          <h3 className="text-3xl font-semibold text-center mb-4">
            {EDITMODE ? "Edit Ticket" : "Create Ticket"}
          </h3>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title:</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              required
              value={formData.title}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description:</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              required
              value={formData.description}
              rows={5}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category:</label>
            <input
              id="category"
              name="category"
              type="text"
              onChange={handleChange}
              required
              value={formData.category}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-2 font-medium">Priority:</label>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <label
                  key={num}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    id={`priority-${num}`}
                    name="priority"
                    type="radio"
                    onChange={handleChange}
                    value={num}
                    checked={formData.priority == num}
                    className="accent-blue-500"
                  />
                  <span className="text-gray-700">{num}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div>
            <label className="block mb-1 font-medium">Progress:</label>
            <input
              type="range"
              id="progress"
              name="progress"
              value={formData.progress}
              min={0}
              max={100}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 font-medium">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="not started">Not Started</option>
              <option value="paused">Paused</option>
              <option value="in progress">In Progress</option>
              <option value="testing">Testing</option>
              <option value="deployment">Deployment</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition duration-200 flex items-center justify-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 mr-2 border-t-green-500 animate-spin"></div>
              ) : null}
              <span>{EDITMODE ? "Update Ticket" : "Create Ticket"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
