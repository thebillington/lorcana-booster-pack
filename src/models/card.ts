export interface Card {
  id: number;
  baseName: string;
  fullName: string;
  subtitle: string;
  type: string;
  images: { full: string };
  color: string;
  cost: number;
}
  