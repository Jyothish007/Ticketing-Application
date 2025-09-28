import Ticket from "../../{models}/Ticket";
import { NextResponse } from "next/server";
import User from "../../{models}/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, ...ticketData } = body;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create ticket with reference to user._id
    const ticket = await Ticket.create({
      ...ticketData,
      user: user._id,
    });

    return NextResponse.json(
      { message: "Ticket Created", ticket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { message: "User email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch only tickets belonging to this user
    const tickets = await Ticket.find({ user: user._id }).populate(
      "user",
      "name email"
    );

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
