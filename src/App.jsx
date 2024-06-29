import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const createInitialArticles = () =>  ({
	"limitNumber": 2,
	"totalItems": 14,
	"totalPages": 7,
	"currentPage": 1,
	"items": [
		{
			"_id": "667d0854e58fb977cfaf30bc",
			"title": "Manfaat Mempelajari Bahasa Pemrograman",
			"user": {
				"_id": "667d0853e58fb977cfaf30ba",
				"first_name": "admin",
				"last_name": "admin",
				"username": "admin"
			},
			"is_published": true,
			"created_at": "2024-06-27T06:36:04.090Z",
			"updated_at": "2024-06-27T06:36:04.090Z",
			"__v": 0
		},
		{
			"_id": "667d0854e58fb977cfaf30be",
			"title": "Bagaimana cara mendapat 1000 tahun extra live span",
			"user": {
				"_id": "667d0853e58fb977cfaf30ba",
				"first_name": "admin",
				"last_name": "admin",
				"username": "admin"
			},
			"is_published": false,
			"created_at": "2024-06-27T06:36:04.096Z",
			"updated_at": "2024-06-27T06:36:04.096Z",
			"__v": 0
		}
	]
});

const formatDate = (date) => {
	return new Date(date).toLocaleDateString('id-ID', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	})
}

function App() {
  const [articles, setArticles] = useState(createInitialArticles);

	const articleList = articles.items.map(article => (
		<li 
			key={article._id}
			className='ring-1 ring-slate-700 p-2 rounded-sm bg-slate-800 cursor-pointer'
		>
			<h2 className='text-lg font-semibold'>{article.title}</h2>
			<p>By: {article.user.username}</p>
			<p className='text-sm'>{formatDate(article.created_at)}</p>
		</li>
	))

  return (
    <div  className='min-h-screen bg-slate-900 text-slate-200 px-4 py-8'>
		<div className='max-w-4xl mx-auto'>
			<h1 className='text-2xl font-semibold'>Articles</h1>
			<ul className='flex flex-col gap-4'>
				{articleList}
			</ul>
		</div>
    </div>
  )
}

export default App
