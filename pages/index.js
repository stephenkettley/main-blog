import { Categories, PostCard, PostWidget } from "@/components";
import Head from "next/head";

const posts = [
  { title: "React Testing", excerpt: "Learn React Testing" },
  { title: "React Tailwind", excerpt: "Learn React Tailwind" },
];

export default function Home() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Explore Reality Blog</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget></PostWidget>
            <Categories></Categories>
          </div>
        </div>
      </div>
    </div>
  );
}
