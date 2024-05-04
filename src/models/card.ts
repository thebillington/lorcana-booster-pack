export interface Card {
  id: number;
  baseName: string;
  subtitle: string;
  type: string;
  images: { full: string };
  color: string;
  cost: number;
}
  