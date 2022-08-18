import { auth } from '../../lib/firebase';
import Feed from '../../components/Feed';
import Profile from '../../components/Profile';
import { getUserWithUsername, postToJSON } from '../../lib/firebase';

export async function getServerSideProps({query}) {
    
    const { username } = query;
    const thisUser = await getUserWithUsername(username);

    let user = null;
    let posts = null;

    if (thisUser) {
        user = thisUser.data();
        const postsQuery = thisUser.ref
            .collection('posts')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5);
        
        posts = (await postsQuery.get()).docs.map(postToJSON)
    }

    return {
        props: {user, posts},
    };
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

export default function UserProfile({user, posts}) {

    return (
        <main>
            <Profile user={user}/>
            <Feed posts={posts}/>
            <SignOutButton />
        </main>
    )
}