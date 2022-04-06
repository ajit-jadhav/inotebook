import NoteContext from "./noteContext";
import { useState } from 'react';

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "62406592fghe55yud64f95df318e2",
          "user": "624027ed128a21fc8cbe41ad",
          "title": "my first note",
          "description": "this is test",
          "tag": "test",
          "date": "2022-03-27T13:24:34.387Z",
          "__v": 0
        },
        {
          "_id": "624d055hjk29fc9ty267e8b904f2d",
          "user": "624027ed128a21fc8cbe41ad",
          "title": "my note 2",
          "description": "this is test 2",
          "tag": "test2",
          "date": "2022-04-06T03:13:22.685Z",
          "__v": 0
        },
        {
          "_id": "624d055bqw9fc926er7e8b904f2f",
          "user": "624027ed128a21fc8cbe41ad",
          "title": "my note 3",
          "description": "this is test 3",
          "tag": "test3",
          "date": "2022-04-06T03:13:31.669Z",
          "__v": 0
        },
        {
            "_id": "62406592e34555dwe64f95df318e2",
            "user": "624027ed128a21fc8cbe41ad",
            "title": "my first note",
            "description": "this is test",
            "tag": "test",
            "date": "2022-03-27T13:24:34.387Z",
            "__v": 0
          },
          {
            "_id": "624d05525679f45c9267e8b904f2d",
            "user": "624027ed128a21fc8cbe41ad",
            "title": "my note 2",
            "description": "this is test 2",
            "tag": "test2",
            "date": "2022-04-06T03:13:22.685Z",
            "__v": 0
          },
          {
            "_id": "62406592e589512d64f95df318e2",
            "user": "624027ed128a21fc8cbe41ad",
            "title": "my first note",
            "description": "this is test",
            "tag": "test",
            "date": "2022-03-27T13:24:34.387Z",
            "__v": 0
          },
          {
            "_id": "624d05529f12c922367e8b904f2d",
            "user": "624027ed128a21fc8cbe41ad",
            "title": "my note 2",
            "description": "this is test 2",
            "tag": "test2",
            "date": "2022-04-06T03:13:22.685Z",
            "__v": 0
          },
          {
            "_id": "62406592e545645d6453f95df318e2",
            "user": "624027ed128a21fc8cbe41ad",
            "title": "my first note",
            "description": "this is test",
            "tag": "test",
            "date": "2022-03-27T13:24:34.387Z",
            "__v": 0
          },
          {
            "_id": "624d05529fc567926457e8b904f2d",
            "user": "624027ed128a21fc8cbe41ad",
            "title": "my note 2",
            "description": "this is test 2",
            "tag": "test2",
            "date": "2022-04-06T03:13:22.685Z",
            "__v": 0
          },
      ]

      const [notes, setnotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setnotes} }>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;