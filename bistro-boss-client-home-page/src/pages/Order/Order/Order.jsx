import Cover from "../../Shared/Cover/Cover";
import CoverImg from "../../../assets/shop/banner2.jpg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import "./Order";
import useMenu from "../../../hooks/useMenu";
import Card from "../../Shared/Ordercard/Card";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
  const location = useLocation();
  const [tabInd, setTabInd] = useState(location?.state?.category);
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soup");
  const salads = menu.filter((item) => item.category === "salad");
  const pizzs = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss || Order Food</title>
      </Helmet>
      <Cover height={700} coverTitle={"Order Food"} bgImg={CoverImg} />
      <Tabs
        className="py-10 px-5 md:px-10"
        defaultIndex={tabInd}
        onSelect={(ind) => setTabInd(ind)}
      >
        <TabList className="flex items-center justify-center mb-10">
          <Tab className="px-4 py-2 hover:cursor-pointer outline-none">
            Salad
          </Tab>
          <Tab className="px-4 py-2 hover:cursor-pointer outline-none">
            Pizza
          </Tab>
          <Tab className="px-4 py-2 hover:cursor-pointer outline-none">
            Soup
          </Tab>
          <Tab className="px-4 py-2 hover:cursor-pointer outline-none">
            Dessert
          </Tab>
          <Tab className="px-4 py-2 hover:cursor-pointer outline-none">
            Drinks
          </Tab>
        </TabList>

        <TabPanel>
          <div className="flex justify-center items-center flex-col">
            <div
              style={{ maxWidth: "1400px" }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {salads.map((item) => (
                <Card key={item?._id} item={item} />
              ))}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex justify-center items-center flex-col">
            <div
              style={{ maxWidth: "1400px" }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {pizzs.map((item) => (
                <Card key={item?._id} item={item} />
              ))}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex justify-center items-center flex-col">
            <div
              style={{ maxWidth: "1400px" }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {soups.map((item) => (
                <Card key={item?._id} item={item} />
              ))}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex justify-center items-center flex-col">
            <div
              style={{ maxWidth: "1400px" }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {desserts.map((item) => (
                <Card key={item?._id} item={item} />
              ))}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex justify-center items-center flex-col">
            <div
              style={{ maxWidth: "1400px" }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {drinks.map((item) => (
                <Card key={item?._id} item={item} />
              ))}
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
