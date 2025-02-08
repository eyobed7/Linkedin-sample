import InputOption from './InputOption';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import './Feed.css';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import { db } from './firebase'; // Import Firestore instance
import { collection,query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
function Feed() {
  const user=useSelector(selectUser);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    // Create a reference to the 'posts' collection
    const postsCollection = collection(db, 'posts');
  
    // Use `query` to add an `orderBy` clause for sorting by `timestamp` in descending order
    const q = query(postsCollection, orderBy('timestamp', 'desc'));
  
    // Listen to real-time updates with `onSnapshot`
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    const postsCollection = collection(db, 'posts'); // Get the 'posts' collection
    addDoc(postsCollection, {
      name: user.displayName,
      description: 'This is my post',
      message: input,
      photoUrl: '',
      timestamp: serverTimestamp(), // Use `serverTimestamp()` directly
    });
    setInput(''); // Clear the input after sending the post
  };

  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start a post"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>

      {/* Render posts dynamically */}
     
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}

    


      {/* Static post example */}

    </div>
  );
}

export default Feed;