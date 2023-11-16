import {AiOutlineRight} from "react-icons/ai" 

function SideNavContent({title,one,two,three}) {
  return (
    <div className=" py1 border-b-[1px] border-b-gray-300">
        <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">{title}</h3>
        <ul className="text-sm leading-3">
            <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                {one} <span><AiOutlineRight /></span>
            </li>
            <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                {two} <span><AiOutlineRight /></span>
            </li>
            <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                {three} <span><AiOutlineRight /></span>
            </li>
        </ul>
    </div>
  )
}

export default SideNavContent