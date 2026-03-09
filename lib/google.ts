import { NextApiRequest, NextApiResponse } from "next";
import { loginWithGoogle } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tokenId, email, name } = req.body;

    // 1️⃣ Google-ийн token-ийг баталгаажуулах (Google API ашиглах)
    // Жишээ: const ticket = await googleClient.verifyIdToken({ idToken: tokenId });
    // const payload = ticket.getPayload();

    // 2️⃣ Хэрэглэгч байгаа эсэхийг шалгах
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Шинэ хэрэглэгч үүсгэх
      user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    // 3️⃣ JWT үүсгэх, cookie-д хадгалах
    await loginWithGoogle(user.id, user.email);

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Google login failed" });
  }
}