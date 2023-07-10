export type PostData = {
  blogId: string;
  title: string;
  date: string;
  latestUpdate: string;
  blogContentHTML?: string;
  previousPostDate: string | undefined;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  tags: string[];
  pageId?: number;
};

export type AllPostsData = {
  allPostsData: PostData[];
};

export type TPage = {
  totalCount: number;
};

export type TPaths = {
  params: {
    id: string;
  };
}[];

export type TMainPage = AllPostsData & TPage;
