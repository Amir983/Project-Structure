import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/UI/Model";
import { formInputsList, productList } from "./data/index";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import type { IProduct } from "./interfaces/interface";

const App = () => {
  const defobj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* --------------------------State-------------------------------- */
  const [product, setproduct] = useState<IProduct>(defobj);
  const [isOpen, setIsOpen] = useState(false);
  /*-----------------------------HNDLER-------------------------------- */
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const producthandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setproduct({
      ...product,
      [name]: value,
    });
  };
  function onsubmitHandler(event: FormEvent<HTMLDivElement>): void {
    event.preventDefault();
  }

  function Cancelhandler(): void {
    setproduct(defobj);
    closeModal();
  }
  /*-----------------------------RENDER------------------------------------*/
  const rernderList = productList.map((product) => (
    <ProductCard key={product.id} productLists={product} />
  ));
  const renderform = formInputsList.map((form) => (
    <div className="flex flex-col m-2" key={form.id}>
      <label htmlFor="" className="mb-1 text-sm font-medium text-gray-700">
        {form.label}
      </label>
      <Input
        type="text"
        id={form.id}
        name={form.name}
        value={product[form.name]}
        onChange={producthandler}
      ></Input>
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
        <div className="space-y-2" onSubmit={onsubmitHandler}>
          {renderform}

          <div className="flex items-center space-x-2 ">
            <Button className="bg-indigo-600 hover:bg-indigo-400">
              Submit
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-500"
              onClick={Cancelhandler}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Model>
    </main>
  );
};

export default App;
