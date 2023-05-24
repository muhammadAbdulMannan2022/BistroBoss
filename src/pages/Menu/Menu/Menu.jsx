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
const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soup");
  const salads = menu.filter((item) => item.category === "salad");
  const pizzs = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
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
      {/* dessert */}
      <MenuCategory items={desserts} title={"desserts"} coverImg={DessertImg} />
      {/* salads */}
      <MenuCategory items={salads} title={"Salads"} coverImg={SaladImg} />
      {/* soup */}
      <MenuCategory items={soups} title={"Soups"} coverImg={SoupImg} />
      {/* pizza */}
      <MenuCategory items={pizzs} title={"Pizzas"} coverImg={PizzaImg} />
    </div>
  );
};

export default Menu;
