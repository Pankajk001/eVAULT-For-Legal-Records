import React from 'react'

const  Card= (props) => {
  return (
    <>
    <div className="max-w-sm mx-auto bg-slate-200 rounded-md shadow-md overflow-hidden flex justify-center item-center text-center">

    <div className="border-3 border-white">
      <div className="md:flex-shrink-0">
        <img className="h-48 w-full object-cover md:w-48 rounded-full bg-white"  src={props.imgsrc} />
      </div>
      <div className="p-4">

        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{props.sname}</div>
        <p className="mt-2 text-gray-500">{props.title}</p>
        <div className="mt-4">
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">{props.link}</a>
        </div>
        <button class="bg-pink-600 text-white hover:bg-white hover:text-pink-400 border border-pink-400 font-bold py-2 px-4 shadow-md hover:shadow-lg">
  Proceed
</button>

      </div>
    </div>
  </div>
  </>
  )
}
 
export default Card;
