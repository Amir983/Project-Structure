import Button from "./UI/Button";
import Imag from "./UI/Imag";
import type { IProduct } from "../interfaces/interface";
import { textslice } from "../utils/Functions";
import Colors from "./UI/Colors";

interface Iprops {
  productLists: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
}

const ProductCard = ({
  productLists,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
}: Iprops) => {
  const { imageURL, title, description, category, price, colors } =
    productLists;

  const rendercolors = colors.map((color) => (
    <Colors key={color} color={color} />
  ));

  const prodctEdit = () => {
    setProductToEdit(productLists);
    openEditModal();
    setProductToEditIdx(idx);
  };

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Imag
        imageURL={imageURL}
        Alt={"product"}
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 break-words">
        {textslice(description)}
      </p>
      <div className="flex items-center flex-wrap space-x-1">
        {rendercolors}
      </div>
      <div className="flex items-center justify-between">
        <span>{price}$</span>
        <Imag
          imageURL={category.imageURL}
          Alt={category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-600" width={"w-full"} onClick={prodctEdit}>
          Edit
        </Button>
        <Button className="bg-red-600" width={"w-full"}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
