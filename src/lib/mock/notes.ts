import { Note } from "@/types/note";

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "BTC 多头行情分析",
    content: "今天 BTC 冲破 70k，市场情绪高涨...",
    tags: ["BTC", "行情"],
    createdAt: "2025-05-01T12:00:00Z",
    updatedAt: "2025-05-01T12:00:00Z",
    author: {
      id: "user1",
      name: "Satoshi",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: "2",
    title: "ETH 支撑位分析",
    content: "ETH 目前在支撑区域，可以考虑低吸...",
    tags: ["ETH", "策略"],
    createdAt: "2025-05-02T14:00:00Z",
    updatedAt: "2025-05-02T14:30:00Z",
    author: {
      id: "user2",
      name: "Vitalik",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
  },
];
