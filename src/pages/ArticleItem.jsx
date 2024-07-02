import { useEffect, useState } from 'react';
import DOMpurify from 'dompurify';
import { useParams } from 'react-router-dom';
import config from '../config.js';
import CommentSection from '../components/Comment/CommentSection.jsx';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    // dont runt the effect if the data still valid;
    console.log('try running the fetch all coomment effect');
    if (validation) return;
    console.log('fetching comment again');

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
        setValidation(true);
      }
    };

    fetchData();
  }, [url, validation]);

  return { data, loading, error, setValidation };
};

const HTMLRenderer = ({ htmlString }) => {
  const cleanHtml = DOMpurify.sanitize(htmlString, {
    USE_PROFILES: { html: true },
  });
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

function ArticleItem() {
  const { articleName } = useParams();

  const articleId = articleName.split('-').pop(); //ex: "Manfaat-Mempelajari-Bahasa-Pemrograman-667d0854e58fb977cfaf30bc"
  const {
    data: article,
    loading: articleLoading,
    error: articleError,
  } = useFetch(`${config.server.url}/articles/${articleId}`);
  const {
    data: comment,
    loading: commentLoading,
    error: commentError,
    setValidation: setCommentValidation,
  } = useFetch(`${config.server.url}/articles/${articleId}/comments?limit=0`);

  if (articleLoading) return <p>Article Loading...</p>;
  if (articleError) return <p>{articleError.message}</p>;

  return (
    <div className="max-w-[65ch] px-4 my-8 mx-auto">
      <div className="prose lg:prose-lg">
        <h1>{article.title}</h1>
        <HTMLRenderer htmlString={article.content} />
      </div>
      <hr />
      <div>
        {commentLoading ? (
          <p>Comment loading...</p>
        ) : commentError ? (
          <p>{commentError.message}</p>
        ) : (
          <CommentSection
            commentData={comment}
            setCommentValidation={setCommentValidation}
          />
        )}
      </div>
    </div>
  );
}

export default ArticleItem;
