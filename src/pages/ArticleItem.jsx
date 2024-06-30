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
	const { data: article, loading, error } = useFetch(`${config.server.url}/articles/${articleId}`);
  
	if (loading) return <p>Loading...</p>
	if (error) return <p>{error.message}</p>
	
  return (
    <div className="prose lg:prose-lg mx-auto mt-8 px-4">
      <h1>{ article.title }</h1>
      <HTMLRenderer htmlString={article.content} />
    </div>
  )
}

export default ArticleItem