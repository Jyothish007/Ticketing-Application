import Ticket from "@/app/{models}/Ticket";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const findTicket = await Ticket.findOne({ _id: id });

    return NextResponse.json({ findTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const ticketData = body.formData;
    const updateTicket = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });
    const updatedTicket = await Ticket.findById(id);
    console.log("Updated ticket:", updatedTicket);
    console.log("Ticket data to update:", ticketData);
    return NextResponse.json({ message: "Ticket Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
