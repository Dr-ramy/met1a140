import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import MetaMessage from "@/app/models/MetaMessage";

interface Params {
  params: Promise<{ id: string }>;
}

// GET - جلب رسالة معينة
export async function GET(req: Request, context: Params) {
  await dbConnect();

  const params = await context.params;
  const { id } = params;

  try {
    const message = await MetaMessage.findById(id);
    if (!message) {
      return NextResponse.json({ error: "الرسالة غير موجودة" }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
        console.error("خطأ في حذف الرسالة:", error);
    return NextResponse.json({ error: "خطأ في جلب الرسالة" }, { status: 500 });
  }
}

// PUT - تعديل رسالة معينة
export async function PUT(req: Request, context: Params) {
  await dbConnect();

  const params = await context.params;
  const { id } = params;

  try {
    const { content } = await req.json();

    if (!content || content.trim() === "") {
      return NextResponse.json({ error: "المحتوى مطلوب" }, { status: 400 });
    }

    const updatedMessage = await MetaMessage.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json({ error: "الرسالة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json(updatedMessage);
  } catch (error) {
        console.error("خطأ في حذف الرسالة:", error);
    return NextResponse.json({ error: "خطأ في تعديل الرسالة" }, { status: 500 });
  }
}

// DELETE - حذف رسالة معينة
export async function DELETE(req: Request, context: Params) {
  await dbConnect();

  const params = await context.params;
  const { id } = params;

  try {
    const deletedMessage = await MetaMessage.findByIdAndDelete(id);
    if (!deletedMessage) {
      return NextResponse.json({ error: "الرسالة غير موجودة" }, { status: 404 });
    }
    return NextResponse.json({ message: "تم حذف الرسالة بنجاح" });
  } catch (error) {
        console.error("خطأ في حذف الرسالة:", error);
    return NextResponse.json({ error: "خطأ في حذف الرسالة" }, { status: 500 });
  }
}
