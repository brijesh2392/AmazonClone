
import {footerBottomItem} from "../../constants"


const FooterBottom = () => {
  return (
    <div className='w-full bg-[#232f3e] py-8'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='w-full grid grid-cols-3 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-7 gap-3 place-content-center text-gray-400'>
          {footerBottomItem.map((item) => (
            <div className="group cursor-pointer" key={item._id}>
              <h3 className=" text-[#dddddd] ">{item.title}</h3>
              <p className=" text-[#dddddd]">{item.des}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterBottom