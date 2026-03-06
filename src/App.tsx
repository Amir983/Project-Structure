import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/UI/Model";
import { colors, formInputsList, productList } from "./data/index";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import type { IProduct } from "./interfaces/interface";
import { Validtion } from "./validation";
import ErrorMessage from "./components/ErrorMas";
import Colors from "./components/UI/Colors";
import { v4 as uuid } from "uuid";

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
  const [products, setproducts] = useState<IProduct[]>(productList);
  const [errors, seterrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempcolor, settempcolor] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  console.log(tempcolor);
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
    seterrors({
      ...errors,
      [name]: "",
    });
    console.log("errors after:", errors);
  };
  function onsubmitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = Validtion({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrors = Object.values(errors).every((value) => value === "");
    if (!hasErrors) {
      seterrors(errors);
      return;
    }
    setproducts((prev) => [
      { ...product, id: uuid(), colors: tempcolor },
      ...prev,
    ]);
    setproduct(defobj);
    settempcolor([]);
    closeModal();
  }
  function Cancelhandler(): void {
    setproduct(defobj);
    closeModal();
  }
  /*-----------------------------RENDER------------------------------------*/
  const rernderList = products.map((product) => (
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
      <ErrorMessage msg={errors[form.name]} />
    </div>
  ));
  const rendercolors = colors.map((color) => (
    <Colors
      key={color}
      color={color}
      onClick={() => {
        if (tempcolor.includes(color)) {
          settempcolor((prev) => prev.filter((item) => item !== color));
          return;
        }
        settempcolor((prev) => [...prev, color]);
      }}
    />
  ));
  return (
    <main className="container ">
      <div className=" flex items-center justify-center">
        <Button
          className="bg-indigo-600 hover:bg-indigo-400 w-52 "
          onClick={openModal}
        >
          BULID PRODUCT
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
        <form className="space-y-2" onSubmit={onsubmitHandler}>
          {renderform}
          <div className="flex space-x-2 items-center justify-center p-2">
            {rendercolors}
          </div>
          <div className="flex space-x-2 items-center justify-center p-2">
            {tempcolor.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 rounded-md text-xs text-white "
                style={{ background: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2 ">
            <Button
              className="bg-indigo-600 hover:bg-indigo-400"
              width={"w-full"}
            >
              Submit
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-500"
              onClick={Cancelhandler}
              width={"w-full"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
    </main>
  );
};

export default App;
