import Button from "./UI/Button";
import Imag from "./UI/Imag";
import type { IProduct } from "../interfaces/interface";
import { textslice } from "../utils/Functions";
interface Iprops {
  productLists: IProduct;
}

const ProductCard = ({ productLists }: Iprops) => {
  const { imageURL, title, description, category, price } = productLists;
  return (
    <div
      className="
              max-w-sm    {/* أقصى عرض صغير على الموبايل */}
              md:max-w-lg {/* أقصى عرض كبير على الشاشات المتوسطة */}
              mx-auto     {/* سنتر أفقي */}
              md:mx-0     {/* شيل السنتر على الشاشات المتوسطة */}
              border      {/* بوردر */}
              rounded-md  {/* كورنر مدور */}
              p-2         {/* padding من كل الجهات */}
              flex        {/* flex container */}
              flex-col    {/* اتجاه عمودي */}
              space-y-3   {/* مسافة بين العناصر عمودياً */}
            "
    >
      <Imag
        imageURL={imageURL}
        Alt={"product"}
        className={`
        rounded-md  {/* كورنر مدور */}
        h-52        {/* ارتفاع ثابت */}
        w-full      {/* عرض كامل */}
        lg:object-cover {/* الصورة تملا المساحة من غير تمدد */}
      `}
      />
      <h3 className="m-2">{title}</h3>
      <p>{textslice(description)}</p>
      <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 rounded-full bg-black cursor-pointer " />
        <span className="w-5 h-5 rounded-full bg-red-600 cursor-pointer " />
        <span className="w-5 h-5 rounded-full bg-gray-800 cursor-pointer " />
      </div>
      <div className="flex items-center justify-between">
        <span>{price}$</span>
        <Imag
          imageURL={category.imageURL}
          Alt={category.name}
          className={"w-10 h-10 rounded-full object-cover"}
        />
      </div>

      <div className="flex items-center justify-between space-x-2 mt-5 {/* margin من فوق */}">
        <Button className="bg-indigo-600 " width={"w-full"}>
          Edit
        </Button>
        <Button className="bg-red-600 " width={"w-full"}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
