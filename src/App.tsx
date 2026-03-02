import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/UI/Model";
import { formInputsList, productList } from "./data/index";
import Button from "./components/UI/Button";
import Input from "./components/UI/input";

const App = () => {
  /* --------------------------State-------------------------------- */
  const [isOpen, setIsOpen] = useState(false);
  /*-----------------------------HNDLER-------------------------------- */
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  /*-----------------------------RENDER------------------------------------*/
  const rernderList = productList.map((product) => (
    <ProductCard key={product.id} productLists={product} />
  ));
  const renderform = formInputsList.map((form) => (
    <div className="flex flex-col m-2">
      <label htmlFor="">{form.label}</label>
      <Input type="text" id={form.id} name={form.name}></Input>
    </div>
  ));
  return (
    <main className="container ">
      <div className="">
        <Button
          className="bg-indigo-600 hover:bg-indigo-400 "
          onClick={openModal}
        >
          ADD PRODUCT
        </Button>
      </div>
      <div
        className="
  m-5                           {/* margin من كل الجهات */}
  grid                          {/* grid container */}
  grid-cols-1                   {/* عمود واحد على الموبايل */}
  md:grid-cols-2                {/* عمودين على الشاشات المتوسطة */}
  lg:grid-cols-3                {/* 3 أعمدة على الشاشات الكبيرة */}
  xl:grid-cols-4                {/* 4 أعمدة على الشاشات الأكبر */}
  gap-2                         {/* مسافة بين العناصر صغيرة على الموبايل */}
  md:gap-4                      {/* مسافة بين العناصر أكبر على الشاشات المتوسطة */}
  p-2                           {/* padding من كل الجهات */}
  rounded-md                    {/* كورنر مدور */}
"
      >
        {rernderList}
      </div>

      <Model
        isOpen={isOpen}
        closeModal={closeModal}
        title={"ADD A NEW PRODUCT"}
      >
        {renderform}
        <div className="flex items-center space-x-2 ">
          <Button className="bg-indigo-600 hover:bg-indigo-400">Submit</Button>
          <Button className="bg-gray-700 hover:bg-gray-500">Cancel</Button>
        </div>
      </Model>
    </main>
  );
};

export default App;
