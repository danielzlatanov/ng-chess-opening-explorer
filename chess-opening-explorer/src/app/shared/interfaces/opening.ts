export interface IOpening {
  id?: string;
  name: string;
  description: string;
  fen: string;
  level: string;
  ownerId?: string;
  ownerEmail?: string;
  exploredBy?: Record<string, boolean>;
  favouritedBy?: Record<string, boolean>;
}
