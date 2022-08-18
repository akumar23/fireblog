import Loader from '../components/Loader';
import { useState } from 'react';
import { firestore, postToJSON, fromMillis } from '../lib/firebase';
import Feed from '../components/Feed';


const LIMIT = 3;

export async function getServerSideProps(context) {

  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

    const posts = (await postsQuery.get()).docs.map(postToJSON);

    return {
      props: {posts},
    };

}

export default function Home(props) {
 
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const[postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    
    setLoading(true);
    const last = posts[posts.length-1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }

  };

  return (
    <>
      <main>
        <Feed posts={posts} />

        {!loading && !postsEnd && <button onClick={getMorePosts}> Load More </button>}

        <Loader show={loading} />

        {postsEnd && 'We have no more posts to show'}

      </main>
    </>
  );
}
