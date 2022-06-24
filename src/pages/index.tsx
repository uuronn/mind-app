import { css } from '@emotion/react';
import { useState, useRef, useEffect, createRef } from 'react';
import { clearInterval } from 'timers';
import CreateButton from '../components/shared/CreateButton';
import MindCard from '../components/shared/MindCard';

const home = css`
  width: 100vw;
  height: 100vh;
  // background: red;
  list-style: none;
`

// interface matter {
//   element: string,
//     engine: string,
//     options: {
//       wireframes: boolean,
//       width: number,
//       height: number,
//       background: 'rgba(255, 0, 0, 0.5)'
// }
// }

interface MindApi {
  word: string
  mmid: string
}

export interface Mind extends MindApi {
  xVal: number
  yVal: number
  ref?: React.RefObject<HTMLLIElement>
}

const Home = () => {
  const [ mindList, setMindList ] = useState<Mind[]>([]);
  const getMindList = async () => {
    try {
      const res: MindApi[] = await fetch('http://127.0.0.1:8000/api/wordlists')
      .then(a => a.json())
      console.log("fdfd")
      console.log(res)
      // console.log(res.[2].word)
      
    } catch(e) {
      console.log(e)
      console.log("error")
      // console.log("error")
      // console.log(error)
    }
  }
  useEffect(() => {
    getMindList()
    },[])
  
  const createHandler = () => {
    const value = prompt("アイデアを入力してください")
    if(value === "" || value === null) return;
    
    const newMind: Mind = {
      mmid: value,
      word: value,
      xVal: 600,
      yVal: 300,
      ref: createRef(),
    }
    
    setMindList([...mindList, newMind,])
  }
  
  const updateRect = (mind: Mind, mmid: string) => {
    
    const updateMindList = mindList.map(mindItem => {
      if (mindItem.mmid === mmid) return mind;
      if (!mindItem.ref?.current) return mindItem;
      const rect = mindItem.ref.current.getBoundingClientRect()
      // console.log(rect)
      
      return {
        ...mindItem,
        xVal: rect.left,
        yVal: rect.top,
      }
    })
    setMindList(updateMindList)
  }
  
  // useEffect(() => {
    //   const id = setInterval(() => {
      //     const updateMindList = mindList.map(v => {
        //       return {
          //         ...v,
          //         xVal: v.xVal + 1,
          //         yVal: v.yVal + 1
          //       }
          //     })
          //     setMindList(updateMindList);
          //   }, 1000)
          
          //   // return () => clearInterval(id);
          // }, [])
          return (
            <>
      <ul css={home}>
        {mindList.map((mindItem, i) => {
          return (
            <MindCard mindItem={mindItem} key={i} keyProps={i} updateRect={updateRect}/>
            )
          })}
      </ul>
      <CreateButton createHandler={createHandler}>+</CreateButton>
    </>
  )
}

export default Home
