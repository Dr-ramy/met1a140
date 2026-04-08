import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import MetaMessage from "@/app/models/MetaMessage";

export async function GET() {
  await dbConnect();

  const messages = await MetaMessage.find()
    .sort({ createdAt: 1 }) // الأقدم أولاً
    .lean();

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();
  const { username, content } = body;

  if (!username || !content) {
    return NextResponse.json(
      { error: "الاسم والمحتوى مطلوبان" },
      { status: 400 }
    );
  }

  // 1. حفظ الرسالة الجديدة
  const newMessage = await MetaMessage.create({ username, content });

  // 2. إرجاع الرد مباشرة
  const response = NextResponse.json(newMessage, { status: 201 });

  // 3. تشغيل الحذف في الخلفية دون انتظار
  void (async () => {
    try {
      const totalMessages = await MetaMessage.countDocuments();
      if (totalMessages > 1000) {
        const oldest = await MetaMessage.find()
          .sort({ createdAt: 1 })
          .limit(300)
          .select("_id")
          .lean();

        const idsToDelete = oldest.map((m) => m._id);
        if (idsToDelete.length > 0) {
          const result = await MetaMessage.deleteMany({ _id: { $in: idsToDelete } });
          console.log(`🧹 تم حذف ${result.deletedCount} رسالة قديمة`);
        }
      }
    } catch (error) {
      console.error("❌ خطأ أثناء حذف الرسائل القديمة:", error);
    }
  })();

  return response;
}
