import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import CoverImg from "../../../assets/menu/banner3.jpg";
import DessertImg from "../../../assets/menu/dessert-bg.jpeg";
import SaladImg from "../../../assets/menu/salad-bg.jpg";
import SoupImg from "../../../assets/menu/soup-bg.jpg";
import PizzaImg from "../../../assets/menu/pizza-bg.jpg";
import MenuCategory from "../MenuCategory/MenuCategory";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soup");
  const salads = menu.filter((item) => item.category === "salad");
  const pizzs = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss || Menu</title>
      </Helmet>
      {/* main cover */}
      <Cover coverTitle={"Out Menu"} height={700} bgImg={CoverImg} />
      {/* offered */}
      <SectionTitle
        heading="Todat's Offer"
        subHeading="don't miss"
      ></SectionTitle>
      <MenuCategory items={offered} />
      <div className="flex justify-center mb-10">
        <button className="btn btn-outline px-10 border-b-4 border-t-0 border-r-0 border-l-0">
          <Link to="/order">ORDER YOUR FAVOURITE FOOD</Link>
        </button>
      </div>
      {/* dessert */}
      <MenuCategory items={desserts} title={"desserts"} coverImg={DessertImg} />
      <div className="flex justify-center mb-10">
        <button className="btn btn-outline px-10 border-b-4 border-t-0 border-r-0 border-l-0">
          <Link state={{ category: 3 }} to="/order">
            ORDER YOUR FAVOURITE FOOD
          </Link>
        </button>
      </div>
      {/* salads */}
      <MenuCategory items={salads} title={"Salads"} coverImg={SaladImg} />
      <div className="flex justify-center mb-10">
        <button className="btn btn-outline px-10 border-b-4 border-t-0 border-r-0 border-l-0">
          <Link state={{ category: 0 }} to="/order">
            ORDER YOUR FAVOURITE FOOD
          </Link>
        </button>
      </div>
      {/* soup */}
      <MenuCategory items={soups} title={"Soups"} coverImg={SoupImg} />
      <div className="flex justify-center mb-10">
        <button className="btn btn-outline px-10 border-b-4 border-t-0 border-r-0 border-l-0">
          <Link state={{ category: 2 }} to="/order">
            ORDER YOUR FAVOURITE FOOD
          </Link>
        </button>
      </div>
      {/* pizza */}
      <MenuCategory items={pizzs} title={"Pizzas"} coverImg={PizzaImg} />
      <div className="flex justify-center mb-10">
        <button className="btn btn-outline px-10 border-b-4 border-t-0 border-r-0 border-l-0">
          <Link state={{ category: 1 }} to="/order">
            ORDER YOUR FAVOURITE FOOD
          </Link>
        </button>
      </div>
      {/* drinks */}
      <MenuCategory items={drinks} title={"Drinks"} coverImg={DessertImg} />
      <div className="flex justify-center mb-10">
        <button className="btn btn-outline px-10 border-b-4 border-t-0 border-r-0 border-l-0">
          <Link state={{ category: 4 }} to="/order">
            ORDER YOUR FAVOURITE FOOD
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Menu;
