import User from "@/app/{models}/User";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDB();
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "User Registerd" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occured while registring" },
      { status: 500 }
    );
  }
}
