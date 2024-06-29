import { useState } from "react"
import DOMpurify from 'dompurify';

const createInitialArticle = () => ({
	"_id": "667d0854e58fb977cfaf30bc",
	"title": "Manfaat Mempelajari Bahasa Pemrograman",
	"content": "<p>Bahasa pemrograman adalah kunci utama dalam era digital saat ini. Mengetahui dan memahami beberapa bahasa pemrograman bisa memberikan banyak manfaat. Berikut adalah beberapa manfaat utama dari mempelajari bahasa pemrograman:</p>\n    \n    <h2>1. Meningkatkan Kemampuan Logika dan Pemecahan Masalah</h2>\n    <p>Mempelajari bahasa pemrograman membutuhkan pemikiran logis dan kemampuan untuk memecahkan masalah. Ini membantu Anda mengembangkan pola pikir analitis yang kuat, yang juga berguna dalam kehidupan sehari-hari.</p>\n    \n    <h2>2. Pintu Masuk ke Karir Teknologi</h2>\n    <p>Industri teknologi terus berkembang pesat, dan permintaan untuk ahli IT dan pengembang perangkat lunak semakin tinggi. Menguasai bahasa pemrograman memberi Anda keunggulan dalam mencari pekerjaan di bidang ini.</p>\n    \n    <h2>3. Kreativitas dalam Pembuatan Aplikasi dan Website</h2>\n    <p>Bahasa pemrograman memungkinkan Anda untuk mengubah ide-ide kreatif menjadi kenyataan. Dengan pengetahuan tentang pemrograman, Anda dapat membuat aplikasi mobile, website pribadi, atau bahkan proyek-proyek berbasis teknologi lainnya.</p>\n    \n    <img src=\"programming.jpg\" alt=\"Illustrasi pemrograman\">\n    \n    <h2>4. Kolaborasi dan Komunitas yang Luas</h2>\n    <p>Ada banyak komunitas online dan offline dari pengembang dan programmer di seluruh dunia. Mempelajari bahasa pemrograman membuka pintu untuk berkolaborasi dengan orang-orang yang memiliki minat dan tujuan yang sama.</p>\n    \n    <h2>5. Menyediakan Solusi bagi Masalah Kompleks</h2>\n    <p>Bahasa pemrograman memungkinkan Anda untuk menulis kode yang dapat menangani masalah yang kompleks dan membangun solusi yang efektif. Kemampuan ini sangat berharga di berbagai industri dan disiplin ilmu.</p>\n    \n    <h2>6. Meningkatkan Pengalaman Pengguna (User Experience)</h2>\n    <p>Sebagai pengembang, memahami bahasa pemrograman memungkinkan Anda untuk menciptakan pengalaman pengguna yang lebih baik. Anda dapat mengoptimalkan performa aplikasi dan website untuk memberikan pengalaman yang lebih responsif dan intuitif.</p>\n    \n    <h2>7. Pengembangan Diri dan Kemandirian</h2>\n    <p>Mempelajari bahasa pemrograman membutuhkan ketekunan dan kemandirian. Anda akan terbiasa dengan proses belajar berkelanjutan dan mengatasi tantangan teknis, yang pada akhirnya dapat meningkatkan pengembangan diri secara keseluruhan.</p>\n    \n    <p>Jadi, tidak peduli apakah Anda baru memulai atau sudah memiliki pengalaman, mempelajari bahasa pemrograman selalu memberikan nilai tambah yang signifikan. Mulailah hari ini dan lihat bagaimana kemampuan baru ini membuka pintu untuk peluang yang tak terbatas!</p>",
	"user": {
		"_id": "667d0853e58fb977cfaf30ba",
		"first_name": "admin",
		"last_name": "admin",
		"username": "admin"
	},
	"created_at": "2024-06-27T06:36:04.090Z",
	"updated_at": "2024-06-27T06:36:04.090Z",
	"__v": 0
})

const HTMLRenderer = ({ htmlString }) => {
  const cleanHtml = DOMpurify.sanitize(htmlString, {USE_PROFILES: { html: true}});
  return <div dangerouslySetInnerHTML={{__html: cleanHtml}} />
}

function ArticleItem() {
  const [article, setArticle] = useState(createInitialArticle);
  return (
    <div className="prose lg:prose-lg mx-auto mt-8">
      <h1>{ article.title }</h1>
      <HTMLRenderer htmlString={article.content} />
    </div>
  )
}

export default ArticleItem