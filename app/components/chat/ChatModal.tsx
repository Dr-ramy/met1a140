"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = {
  _id: string;
  username: string;
  content: string;
  createdAt: string;
};

export default function ChatModal() {
  const [username, setUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessage, setEditedMessage] = useState("");
  const [ , setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // تحميل اسم المستخدم من localStorage عند بداية التشغيل
  useEffect(() => {
    const savedName = localStorage.getItem("chat_username");
    if (savedName) setUsername(savedName);
  }, []);

  // تمرير السكروول تلقائيًا
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat", { cache: "no-store" });
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("خطأ في جلب الرسائل:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !newMessage.trim()) return;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          content: newMessage.trim(),
        }),
      });

      if (!res.ok) {
        console.error("فشل في إرسال الرسالة");
        return;
      }

      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("فشل في الطلب:", err);
    }
  };

  const handleSetUsername = () => {
    if (username?.trim()) {
      const name = username.trim();
      localStorage.setItem("chat_username", name);
      setUsername(name);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting message with ID:", id);

    try {
      await fetch(`/api/chat/${id}`, { method: "DELETE" });
      fetchMessages();
    } catch (err) {
      console.error("خطأ في الحذف:", err);
    }
  };

  const handleEdit = (id: string, content: string) => {
    setEditingMessageId(id);
    setEditedMessage(content);
  };

  const handleSaveEdit = async () => {
    if (!editedMessage.trim() || !editingMessageId) return;
    try {
      await fetch(`/api/chat/${editingMessageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedMessage }),
      });
      setEditingMessageId(null);
      setEditedMessage("");
      fetchMessages();
    } catch (err) {
      console.error("فشل التحديث:", err);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          style={{
            top: 20,
            right: 20,
            zIndex: 9999,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#2563eb",
            color: "white",
            fontSize: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            position: "fixed",
          }}
        >
          💬
        </button>
      </DialogTrigger>

      <DialogContent className="w-[90vw] max-w-md h-[75vh] flex flex-col bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold"> chat</DialogTitle>
        </DialogHeader>

        {!username ? (
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="اسم المستخدم"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={handleSetUsername}>حفظ الاسم</Button>
          </div>
        ) : (
          <>
            <div className="h-64 overflow-y-auto border rounded p-2 mb-3 bg-gray-50 flex flex-col gap-2">
              {messages.map((msg) => {
                const isCurrentUser = msg.username === username;
                const messageTime = new Date(msg.createdAt).toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={msg._id}
                    dir="rtl"
                    className={`px-3 py-2 rounded-md max-w-[80%] break-words text-sm shadow-sm ${
                      isCurrentUser
                        ? "bg-blue-100 self-end text-right"
                        : "bg-gray-200 self-start text-right"
                    }`}
                    style={{ alignSelf: isCurrentUser ? "flex-end" : "flex-start" }}
                  >
                    <div className="font-semibold text-gray-800 flex justify-between items-center">
                      <span>{msg.username}</span>
                      <span className="text-xs text-gray-600">{messageTime}</span>
                    </div>
                    {editingMessageId === msg._id ? (
                      <div className="mt-1 flex flex-col gap-1">
                        <Input
                          value={editedMessage}
                          onChange={(e) => setEditedMessage(e.target.value)}
                          className="text-sm"
                        />
                        <div className="flex gap-1 justify-end">
                          <Button size="sm" onClick={handleSaveEdit}>
                            حفظ
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditingMessageId(null)}
                          >
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-900 mt-1">{msg.content}</div>
                    )}
                    {isCurrentUser && editingMessageId !== msg._id && (
                      <div className="flex gap-2 mt-1 justify-end text-xs text-gray-600">
                        <button onClick={() => handleEdit(msg._id, msg.content)}>📝</button>
                        <button onClick={() => handleDelete(msg._id)}>🗑️</button>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالة..."
              />
              <Button type="submit">➤</Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
