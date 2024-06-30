import React from 'react'

const formatDate = (date) => {
	return new Date(date).toLocaleDateString('id-ID', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	})
}

function CommentCard({ comment }) {
  return (
    <div className='bg-slate-100 p-2 rounded-sm flex flex-col gap-1.5'>
      <div className='font-semibold'>{ comment.user.username }</div>
      <p>{ comment.content }</p>
      <p
        className='self-end text-sm text-slate-700'>
        {formatDate(comment.created_at)}</p>
    </div>
  )
}

function CommentList({commentList}) {
  return (
    <div className='flex flex-col gap-2'>
      {commentList.map(comment => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  )
}

function CommentSection({ commentData, loadCommentHandler }) {

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-xl font-semibold'>Comments</div>
      <CommentList commentList={ commentData.items } />
    </div>
  )
}

export default CommentSection