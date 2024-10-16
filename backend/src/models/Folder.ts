export interface Folder {
  id: number;
  nome: string;
  accounts?: {
    id: number;
    titulo: string;
    foto_referencia: string;
    dados: {
      label: string;
      value: string;
    }[];
  }[];
}
