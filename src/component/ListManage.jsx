import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ListManage = (e) => {

  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(""); //수정된 값 저장소 
  const [changeCheck, setChangeCheck] = useState(false);

  const List = async (e) => {
    await axios.get('/list')
      .then((res) => {
        console.log(res.data.result);
        setList(res.data.result);
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    List();
  }, [])

  const onChange = (e) => {
    setChangeCheck(true);
    setUpdate(e.target.value);
  }


  const onUpdate = async (idx) => {
    if (changeCheck === true) {
      await axios.post('/update', {
        idx: idx,
        content: update
      })
        .then((res) => {
          console.log('res');
          alert('수정이 완료되었습니다.');
          window.location.reload();
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  const onDelete = async (idx) => {
    await axios.post('/delete', {
      idx: idx
    })
      .then((res) => {
        console.log('res');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }).catch((err) => {
        console.log(err);
      })
  }



  return (
    <>
      {list.map(k => (
        <ListFormat
          onUpdate={onUpdate}
          onDelete={onDelete}
          onChange={onChange}
          idx={k.idx}
          content={k.content}
          updateContent={k.content}
          updateValue={() => setUpdate(e.target.value)}
        />
      ))}
    </>
  )
}

export const ListFormat = (props) => {
  const [updating, isUpdating] = useState(false);

  return (
    <div className="list">
      {updating === false ?
        <>
          <div className="title" onClick={() => isUpdating(true)}>
            <h3>{props.content}</h3>
          </div>
          <button className="done" onClick={() => props.onDelete(props.idx)}>
            <button type="submit">Done</button> 
            <label for={props.idx} class="done"></label>
          </button>
        </>
        :
        <form onSubmit={() => props.onUpdate(props.idx)}>
          <div className="title">
            <textarea type="text" name="update" onChange={props.onChange} required>{props.updateContent}</textarea>
          </div>
          <div className="btn">
            <button type="submit">Edit</button>
          </div>
        </form>
      }
    </div>
  )
}