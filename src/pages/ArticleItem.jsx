import { useEffect, useState } from "react"
import DOMpurify from 'dompurify';
import { useParams } from "react-router-dom";
import config from '../config.js';

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
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
			}
    };

    fetchData();
  }, [url]);

	return { data, loading, error };
}

const HTMLRenderer = ({ htmlString }) => {
  const cleanHtml = DOMpurify.sanitize(htmlString, {USE_PROFILES: { html: true}});
  return <div dangerouslySetInnerHTML={{__html: cleanHtml}} />
}

function ArticleItem() {
	const { articleName } = useParams();
	
	const articleId = articleName.split('-').pop(); //ex: "Manfaat-Mempelajari-Bahasa-Pemrograman-667d0854e58fb977cfaf30bc"
	const { data: article, loading: articleLoading, error: articleError } = useFetch(`${config.server.url}/articles/${articleId}`);
	const { data: comment, loading: commentLoading, error: commentError } = useFetch(`${config.server.url}/articles/${articleId}/comments`);
  
	if (articleLoading) return <p>Article Loading...</p>
	if (articleError) return <p>{articleError.message}</p>
	
  return (
    <div className="px-4  mt-8">
      <div className="prose lg:prose-lg mx-auto">
        <h1>{ article.title }</h1>
        <HTMLRenderer htmlString={article.content} />
      </div>
      <div>
        { commentLoading 
          ? (<p>Comment loading...</p>)
          : commentError 
            ? (<p>{ commentError.message }</p>) 
            : (JSON.stringify(comment))}
      </div>
    </div>
  )
}

export default ArticleItem