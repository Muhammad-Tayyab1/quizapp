import React, { useState } from 'react'
import {Questionsprops} from './../Types/Quiz_type'
 const Questions:React.FC<Questionsprops> =({question, options,callback }) => {
     
    let [userAns, setUserAns] =useState("")
    const handleChangeEvent=(ev:any)=>{
        setUserAns(ev.target.value)
    }
    return (
        <div className="questions-container">
               <div className="questions"> 
               {question}
               </div>
               
                   <form onSubmit={(e:React.FormEvent<EventTarget>)=> callback(e, userAns)}
                   className="question_form"
                   >
                       {options.map((opt: string, ind:number) => {
                           return(
                               <div key={ind}>
                               <label className="radio">
                                   <input type="radio" name="opt" value={opt} 
                                   required
                                   checked={userAns === opt}
                                   onChange={handleChangeEvent}
                                   />
                                   {opt}
                                   
                               </label>
                               </div>
                           )

                       }
                       )}
                     <input type="submit" className="submit"/>    
                   </form>
               
        </div>
    )
}
export default Questions;