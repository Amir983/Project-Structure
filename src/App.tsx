import ProductCard from "./components/ProductCard";
import { productList } from "./data/index";
const App = () => {
  const rernderList = productList.map((product) => (
    <ProductCard key={product.id} productLists={product} />
  ));
  return (
    <main className="container ">
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
    </main>
  );
};

export default App;
