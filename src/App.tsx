import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/UI/Model";
import { categories, colors, formInputsList, productList } from "./data/index";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import type { IProduct } from "./interfaces/interface";
import { Validtion } from "./validation";
import ErrorMessage from "./components/ErrorMas";
import Colors from "./components/UI/Colors";
import { v4 as uuid } from "uuid";
import Select from "./components/UI/Select";
import type { productname } from "./types";
import Modal from "./components/UI/Model";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  const defaultProductObj = {
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
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColor] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const closeModal = useCallback(() => setIsOpen(false), []);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = useCallback(() => setIsOpenEditModal(true), []);
  const closeConfirmModal = useCallback(() => setIsOpenConfirmModal(false), []);
  const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), []);

  // ✅ onCancel معرفة صح هنا
  const onCancel = () => {
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
    closeEditModal();
  };

  const producthandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const productEdithandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setProductToEdit((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [],
  );

  function onsubmitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = Validtion({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });
    // ✅ المنطق الصح
    const hasErrorMsg = Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
    toast("Product has been Add successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#FF6E31",
        color: "white",
      },
    });
  }
  const removeHandler = useCallback(() => {
    const filter = (Products: IProduct[]) => {
      return Products.filter((p) => p.id !== productToEdit.id);
    };
    setProducts(filter);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  }, [productToEdit.id, closeConfirmModal]);
  function onsubmitEditHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    // ✅ لو مفيش ألوان جديدة استخدم القديمة
    const colorsToSave = tempColors.length ? tempColors : productToEdit.colors;
    const errors = Validtion({
      title,
      description,
      imageURL,
      price,
      colors: colorsToSave,
    });
    // ✅ المنطق الصح
    const hasErrorMsg = Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setTempColor([]);
    closeEditModal();
    toast("Product has been updeted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#820000",
        color: "black",
      },
    });
  }

  const rernderList = useMemo(() => {
    return products.map((product, idx) => (
      <ProductCard
        key={product.id}
        productLists={product}
        setProductToEdit={setProductToEdit}
        openEditModal={openEditModal}
        idx={idx}
        setProductToEditIdx={setProductToEditIdx}
        openConfirmModal={openConfirmModal}
      />
    ));
  }, [products, openEditModal, openConfirmModal]);

  const renderform = formInputsList.map((form) => (
    <div className="flex flex-col" key={form.id}>
      <label htmlFor="" className="mb-[2px] text-sm font-medium text-gray-700">
        {form.label}
      </label>
      <Input
        type="text"
        id={form.id}
        name={form.name}
        value={product[form.name]}
        onChange={producthandler}
      />
      <ErrorMessage msg={errors[form.name]} />
    </div>
  ));

  const rendercolors = useCallback(() => {
    return colors.map((color) => (
      <Colors
        key={color}
        color={color}
        onClick={() => {
          if (tempColors.includes(color)) {
            setTempColor((prev) => prev.filter((item) => item !== color));
            return;
          }
          if (productToEdit.colors.includes(color)) {
            setTempColor((prev) => prev.filter((item) => item !== color));
            return;
          }
          setTempColor((prev) => [...prev, color]);
        }}
      />
    ));
  }, [tempColors, productToEdit.colors]);

  const renderEditproductwitherrors = (
    id: string,
    lable: string,
    name: productname,
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
          {lable}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={productEdithandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container">
      <div className="flex items-center justify-center my-10">
        <Button
          className="bg-indigo-600 hover:bg-indigo-400 w-52"
          onClick={openModal}
        >
          BULID PRODUCT
        </Button>
      </div>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {rernderList}
      </div>
      {/* ADD PRODUCT MODAL */}

      <Model
        isOpen={isOpen}
        closeModal={closeModal}
        title={"ADD A NEW PRODUCT"}
      >
        <form className="space-y-3" onSubmit={onsubmitHandler}>
          {renderform}
          <div className="text-black font-medium">
            <Select
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {rendercolors()}
          </div>
          <ErrorMessage msg={errors.colors} />
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ background: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              width={"w-full"}
            >
              Submit
            </Button>
            <Button
              className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
              onClick={onCancel}
              width={"w-full"}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
      {/* EDIT PRODUCT MODAL */}

      <Model
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title={"Edit THIS PRODUCT"}
      >
        <form className="space-y-2" onSubmit={onsubmitEditHandler}>
          {renderEditproductwitherrors("title", "product title", "title")}
          {renderEditproductwitherrors(
            "description",
            "product description",
            "description",
          )}
          {renderEditproductwitherrors(
            "imageURL",
            "product imageURL",
            "imageURL",
          )}
          {renderEditproductwitherrors("price", "product price", "price")}
          <div className="text-black font-medium">
            <Select
              selected={productToEdit.category}
              setSelected={(value) =>
                setProductToEdit({ ...productToEdit, category: value })
              }
            />
          </div>
          <div className="flex space-x-2 items-center justify-center p-2">
            {rendercolors()}
          </div>
          <ErrorMessage msg={errors.colors} />
          <div className="flex space-x-2 items-center justify-center p-2">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 rounded-md text-xs text-white"
                style={{ background: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-400"
              width={"w-full"}
            >
              Submit
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-500"
              onClick={onCancel}
              width={"w-full"}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>

      {/* DELETE PRODUCT CONFIRM MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster position="top-center" />
    </main>
  );
};

export default App;
