import { useState, useEffect } from 'react';
import config from './config';
import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

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
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

function App() {
  const {
    data: articles,
    loading,
    error,
  } = useFetch(`${config.server.url}/articles`);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const articleList = articles.items.map((article) => {
    const fileName = article.title.split(' ').join('-') + '-' + article._id;
    return (
      <li
        key={article._id}
        className="ring-1 ring-slate-700 p-2 rounded-sm bg-slate-800 cursor-pointer"
      >
        <Link to={fileName}>
          <h2 className="text-lg font-semibold">{article.title}</h2>
          <p>By: {article.user.username}</p>
          <p className="text-sm">{formatDate(article.created_at)}</p>
        </Link>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <ul className="flex flex-col gap-4">{articleList}</ul>
      </div>
    </div>
  );
}

export default App;
