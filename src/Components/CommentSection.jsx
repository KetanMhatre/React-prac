import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function CommentSection() {
  const [inputText, setInputText] = useState('');
  const [userComments, setUserComments] = useState([]);
  const [commentId, setCommentId] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);

  const submitComment = () => {
    if (inputText.trim()) {
      setUserComments((prevComments) => [
        ...prevComments,
        { inputText, replies: [], id: commentId },
      ]);
      setInputText('');
    }
    setCommentId(commentId + 1);
  };

  const handleReplyComment = (id) => {
    if (replyText.trim()) {
      setUserComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? { ...comment, replies: [...comment.replies, replyText] }
            : comment
        )
      );
      setReplyText('');
      setReplyIndex(null);
    }
  };
  
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Card className='p-3'>
        <div className='d-flex gap-3'>
          <input
            name='inputText'
            type='text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: '420px' }}
          />
          <button className='btn btn-primary' onClick={submitComment}>
            comment
          </button>
        </div>
        {userComments.map((comment, index) => {
          return (
            <div key={index} className='mt-2'>
              <Card className='p-2'>
                <div className='d-flex gap-2'>
                  <p className='mb-0 d-flex align-items-center flex-grow-1'>
                    {comment.inputText}
                  </p>
                  <button
                    className='btn btn-primary'
                    onClick={() => {
                      setReplyIndex(replyIndex === index ? null : index);
                    }}
                  >
                    reply
                  </button>
                </div>
                <div>
                  {comment.replies.map((reply, index) => {
                    return (
                      <div key={index}>
                        <p>{reply}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
              {replyIndex === index && (
                <div className='mt-1 d-flex gap-2'>
                  <input
                    type='text'
                    className='flex-grow-1'
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    className='btn btn-primary'
                    onClick={() => handleReplyComment(comment.id)}
                  >
                    comment
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export default CommentSection;
