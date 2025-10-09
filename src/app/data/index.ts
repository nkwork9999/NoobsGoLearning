// app/index.ts

import { content as content1 } from "@/app/data/content";
import { content2 } from "@/app/data/content2";

// 両方を統合して content としてエクスポート
export const content = {
  ...content1,
  ...content2,
};

export type {
  Content,
  Category,
  Topic,
  TopicContent,
} from "@/app/data/content";
