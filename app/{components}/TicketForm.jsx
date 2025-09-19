"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();

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
      const res = await fetch("/api/Tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
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
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl">
          {EDITMODE ? "Edit Ticket" : "Create Ticket"}
        </h3>
        <label>Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
          className="m-1 rounded bg-card"
        />

        <label>Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          className="m-1 rounded bg-card"
          rows="5"
        />

        <label>Category:</label>
        <input
          id="category"
          name="category"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.category}
          className="m-1 rounded bg-card"
        />

        <label>Priority:</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
            className="m-1 rounded bg-card"
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
            className="m-1 rounded bg-card"
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
            className="m-1 rounded bg-card"
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
            className="m-1 rounded bg-card"
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
            className="m-1 rounded bg-card"
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
          className="m-1 rounded bg-card"
        />
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="m-1 rounded bg-card"
        >
          <option value="not started">Not Started</option>
          <option value="paused">Paused</option>
          <option value="in progress">In Progress</option>
          <option value="testing">Testing</option>
          <option value="deployment">Deployment</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
          className="btn"
        />
      </form>
    </div>
  );
};

export default TicketForm;
