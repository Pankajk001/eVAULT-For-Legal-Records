import React from 'react'
import { Hero } from '@/components/data/Hero';
export default function HeroSection() {
  return (
    <div>

        <img  src='https://jharkhandhighcourt.nic.in/images/slide/3.gif' className=' absolute w-screen h-[60vh] object-cover '/>
        <div className=' relative w-screen h-[70vh] object-cover justify-center items-end space-x-5 flex '>
          {
            Hero.map((item,index)=>(
              <>
              <Card links={item.links} imgsrc={item.imgsrc}/>
              </>
              
            ))
          
          }

        </div>
    </div>
  )
}
const Card = (props) => {
  return (
    
      <div className="ml-2  rounded-md shadow-md text-center transition bg-white w-36 h-36 p-3 duration-300 hover:shadow-xl">
      <div className=" border-white flex justify-center items-center flex-col">
        <div className="mx-auto  my-auto flex flex-row flex-wrap">
          <img className="h-15 w-15 object-cover  bg-white" src={props.imgsrc} alt="Card" />
        </div>
        <div className="p-2">
          <a href="" className=' flex flex-col text-center  font-semibold'>{props.links}</a>
        </div>
      </div>
   
    </div>
  );
}
