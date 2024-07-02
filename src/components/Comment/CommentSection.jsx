import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utilites/authentication/AuthProvider';
import { useParams } from 'react-router-dom';

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

function CommentCard({ comment }) {
  return (
    <div className="bg-slate-100 p-2 rounded-sm flex flex-col gap-1.5">
      <div className="font-semibold">{comment.user.username}</div>
      <p>{comment.content}</p>
      <p className="self-end text-sm text-slate-700">
        {formatDate(comment.created_at)}
      </p>
    </div>
  );
}

function CommentList({ commentList }) {
  return (
    <div className="flex flex-col gap-2">
      {commentList.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

function CommentForm() {
  const { user, token, refreshToken } = useAuth();
  const { articleName } = useParams();
  const articleId = articleName.split('-').pop();
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('initialize useEffect');
    if (!isSending || isLoading) {
      if (!isSending)
        console.log('isSending is false , refuse to run the rest of useEffect');
      if (isLoading)
        console.log('its loading, refuse to run the rest of useEffect');
      return;
    }

    (async () => {
      setIsLoading(true);
      try {
        // try to fetch data
        const url = `http://localhost:3000/articles/${articleId}/comments`;
        console.log('try to post comment');
        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify({ content }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log('failed to post comment');
          const resultError = await response.json();
          console.log(resultError);

          // if token expired, try to get new token
          if (resultError.name === 'TokenExpiredError') {
            console.log('access token exprired');
            // fech access token
            const { error } = await refreshToken();
            if (error) setIsSending(false);
            return;
          }
          setError(resultError);
          console.log('failed to post comment');
          throw new Error(resultError.message);
        }
        console.log('success post comment');
        const result = await response.json();
        console.log(result);
        setIsSending(false);
      } catch (error) {
        console.log(error);
        setIsSending(false);
      } finally {
        // console.log('set loading and sending to false');
        setIsLoading(false);
      }
    })();
  }, [isSending, token]);

  const onSendClick = (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/articles/${articleId}/comments`;
    console.log({ url, articleId, token, content });
    setIsSending(true);

    // reset content
    // setContent('');

    // fetch post
    // fetch get all comments
    // disable if no user found
  };
  return (
    <form className="flex flex-col gap-2">
      <textarea
        className="ring-1 ring-gray-500 px-2 w-full"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="write a comment"
        disabled={!user || isLoading || isSending}
      ></textarea>
      {!user || isLoading || isSending ? (
        <p className="text-sm text-slate-700 mt-[-4px]">
          {!user
            ? 'You need to login to write a comment'
            : isLoading
            ? 'Loading'
            : isSending
            ? 'sending'
            : ''}
        </p>
      ) : (
        ''
      )}
      <button
        className="self-end px-4 bg-blue-400 rounded-[16px] disabled:bg-gray-400 disabled:text-gray-600"
        onClick={onSendClick}
        disabled={!user || isLoading || isSending}
      >
        Send
      </button>
    </form>
  );
}

function CommentSection({ commentData, loadCommentHandler }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-semibold">Comments</div>
      <CommentForm />
      <CommentList commentList={commentData.items} />
    </div>
  );
}

export default CommentSection;
