export interface IBook {
  _id?: string;
  id?: string;
  volumeId: string;
  title: string;
  subtitle: string;
  authors: [string];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  pageCount: number;
  dimensions: {
    height: string;
    width: string;
    thickness: string;
  };
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface IShelf {
  _id: string;
  name: string;
  description: string;
  books: IBook[];
  userId: string;
}
