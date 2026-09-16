export type LuckRating =
  | "excellent"
  | "good"
  | "normal"
  | "bad"
  | "terrible";

export interface LuckItem {
  short: string;
  long: string;
}

export interface LuckResult extends LuckItem {
  index: number;
  rating: LuckRating;
}
