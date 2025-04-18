import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function NewComment() {
  const [userText, setUserText] = useState('');
  const [userComments, setUserComments] = useState([]);
  const [commentId, setCommentId] = useState(0);

  const handleComment = () => {
    if (userText.trim()) {
      const data = { comment: userText, id: commentId, replies: [] };
      setUserComments((prevData) => [...prevData, data]);
    }
    setUserText('');
    setCommentId(commentId + 1);
  };

  const [replyText, setReplyText] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);

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
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Card className='p-2'>
        <div className='d-flex gap-3'>
          <input
            type='text'
            name='userText'
            onChange={(e) => setUserText(e.target.value)}
            style={{ width: '300px' }}
          />
          <button className='btn btn-primary' onClick={handleComment}>
            Comment
          </button>
        </div>
        <div className='mt-3'>
          {userComments.map((data, index) => {
            return (
              <Card className='p-2 mt-2' key={index}>
                <div className='d-flex justify-content-between align-content-center'>
                  <h5>{data.comment}</h5>
                  <button
                    className='btn btn-primary'
                    onClick={() =>
                      setReplyIndex(replyIndex !== data.id ? data.id : null)
                    }
                  >
                    reply
                  </button>
                </div>
                {replyIndex === data.id && (
                  <div>
                    <input
                      type='text'
                      name='replyText'
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      className='btn btn-primary'
                      onClick={() => handleReplyComment(data.id)}
                    >
                      reply
                    </button>
                  </div>
                )}
                {userComments.map((comment) =>
                  comment.replies.map((reply, index) => {
                    return (
                      <div key={index}>
                        <p>{reply}</p>
                      </div>
                    );
                  })
                )}
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default NewComment;
