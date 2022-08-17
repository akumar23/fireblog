import styles from '../../styles/Home.module.css';
import AuthCehck from '../../components/AuthCheck';
import toast from 'react-hot-toast';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Feed from '../../components/Feed';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UserContext } from '../../lib/context';
import kebabCase from 'lodash.kebabcase';

export default function Admin() {
  return (
    <main>
        <AuthCehck>
            <Posts />
            <CreatePost />
        </AuthCehck>
    </main>
  );
}

function Posts() {

    const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const postlist = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            <h1> Mange your Posts </h1>
            <Feed posts={postlist} admin />
        </>
    );
}

function CreatePost() {

    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState('');

    const slug = encodeURI(kebabCase(title));
    const isValid = title.length > 3 && title.length < 100;

    const createPost = async (e) => {

        e.preventDefault();

        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: '#text here',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
        };

        await ref.set(data);

        toast.success('Post Made!')

        router.push(`/admin/${slug}`);

    }

    return (
        <form obSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="article"
                className={styles.input}
            />

            <p>
                <strong>Title: </strong> {slug}
            </p>

            <button type="submit" disabled={!isValid} className="btn-gree">
                Create New Post
            </button>

        </form>
    );

}