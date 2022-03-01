import { useContext } from "react";
import { FirebaseContext } from "../App";
import Post from "./Post";

export default function Timeline({ posts }: { posts: any[] }) {
  const context = useContext(FirebaseContext);

  return (
    <div>
      {posts.map((c) => (
        <Post key={c.id} postDoc={c} isOwner={c.creatorId === context?.uid} />
      ))}
    </div>
  );
}
