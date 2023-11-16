import { userInfo } from "../../redux/amazonSlice"

const FooterTop = () => {
  return (
    <div className='w-full bg-white py-6'>
      <div className='w-full border-t-[1px] border-b-[1px] py-8'>
      <div className='w-64 mx-auto text-center flex flex-col gap-1'>
          <p>See personalised recommendations</p>
          <button className="w-full bg-yellow-400 py-1 rounded-md font-semibold cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 ">
            Sign In</button>
          <p className="text-xs mt-1">New Customer? <span className="text-blue-600 ml-1 cursor-pointer">Start here.</span></p>
        </div>
      </div>
    </div>
  )
}

export default FooterTop