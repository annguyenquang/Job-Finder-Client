export type Metadata = {
  type: number;
  value: string;
  id: string;
  active?: number;
};

export const emptyMetadata: Metadata = {
  type: 0,
  value: '',
  id: '',
  active: 0
};