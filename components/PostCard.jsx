const PostCard = ({ post }) => {
  return (
    <div>
      <div>
        {post.title}
        {post.excerpt}
      </div>
    </div>
  );
};

export default PostCard;
