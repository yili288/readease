export type pageSelect =  "original" | "summary";

export type TextDocument = {
  text_id: string;
  name: string;
  description: string;
  content: string;
  summary: string;
  summary_media: string[];
  audio_file_id: string;
}
