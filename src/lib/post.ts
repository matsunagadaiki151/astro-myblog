import { client } from "./client";
import { PER_PAGE } from "@lib/constant";
import type { PostData, TMainPage, TPaths } from "../types/postData";

const clientInfo = { endpoint: "blog", queries: { limit: PER_PAGE } };

// mdファイルのデータを取り出す
export async function getPostsData(id: number): Promise<{ props: TMainPage }> {
  const data = await client.get({
    endpoint: "blog",
    queries: {
      offset: (id - 1) * PER_PAGE,
      limit: PER_PAGE,
      orders: "-publishedAt",
    },
  });

  const contents = data.contents.map((content: PostData) => {
    return { ...content, pageId: id };
  });

  return {
    props: {
      allPostsData: contents,
      totalCount: data.totalCount,
    },
  };
}

// getStaticPathでreturnで使うpathを取得する。
export async function getAllPostIds(): Promise<TPaths> {
  const data = await client.get({
    endpoint: "blog",
    queries: { limit: PER_PAGE, orders: "-publishedAt" },
  });
  let allPostContents = data.contents.map((content: PostData) => {
    return { ...content, pageId: 1 };
  });
  const totalCount = data.totalCount;
  for (let i = 1; i * PER_PAGE < totalCount; i++) {
    const blogData = await client.get({
      endpoint: "blog",
      queries: {
        offset: i * PER_PAGE,
        limit: PER_PAGE,
        orders: "-publishedAt",
      },
    });
    const contents = blogData.contents.map((content: PostData) => {
      return { ...content, pageId: i + 1 };
    });
    allPostContents = [...allPostContents, ...contents];
  }
  const paths = allPostContents.map((content: PostData) => {
    return {
      params: { id: content.blogId },
    };
  });
  return paths;
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id: string) {
  const data = await client.get({
    endpoint: "blog",
    queries: { limit: PER_PAGE, orders: "-publishedAt" },
  });

  const objectContent = data.contents.find(
    (content: PostData) => content.blogId === id
  );

  if (objectContent !== undefined) {
    return {
      ...objectContent,
      pageId: 1,
    };
  }

  const totalCount = data.totalCount;
  for (let i = 1; i * PER_PAGE < totalCount; i++) {
    const blogData = await client.get({
      endpoint: "blog",
      queries: {
        offset: i * PER_PAGE,
        limit: PER_PAGE,
        orders: "-publishedAt",
      },
    });

    const objectContent = blogData.contents.find(
      (content: PostData) => content.blogId === id
    );

    if (objectContent !== undefined) {
      return {
        ...objectContent,
        pageId: i + 1,
      };
    }
  }
}
