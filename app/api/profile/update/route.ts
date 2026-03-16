import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const runtime = "nodejs";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  const formData = await request.formData();
  const name = formData.get("name");
  const image = formData.get("image");
  const skills = formData.get("skills");
  const interests = formData.get("interests");
  const favoriteSubjects = formData.get("favoriteSubjects") ?? formData.get("subjects");

  const updateData: {
    name?: string;
    image?: string;
    skills?: string[];
    interests?: string[];
    favoriteSubjects?: string[];
  } = {};

  const parseList = (value: FormDataEntryValue | null) => {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => String(item).trim())
          .filter(Boolean);
      }
    } catch {
      // fall back to comma-separated parsing
    }
    return trimmed
      .split(/[,\\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  if (typeof name === "string") {
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 40) {
      return NextResponse.json(
        { error: "Name must be between 2 and 40 characters." },
        { status: 400 }
      );
    }
    updateData.name = trimmed;
  }

  if (image && typeof image === "object" && "arrayBuffer" in image) {
    const file = image as File;
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported image type." },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image size must be 2MB or less." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    updateData.image = `data:${file.type};base64,${base64}`;
  }

  const parsedSkills = parseList(skills);
  if (parsedSkills !== undefined) {
    updateData.skills = parsedSkills;
  }

  const parsedInterests = parseList(interests);
  if (parsedInterests !== undefined) {
    updateData.interests = parsedInterests;
  }

  const parsedSubjects = parseList(favoriteSubjects);
  if (parsedSubjects !== undefined) {
    updateData.favoriteSubjects = parsedSubjects;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { error: "No changes provided." },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id: currentUser.userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      skills: true,
      interests: true,
      favoriteSubjects: true,
    },
  });

  return NextResponse.json({ user });
}
