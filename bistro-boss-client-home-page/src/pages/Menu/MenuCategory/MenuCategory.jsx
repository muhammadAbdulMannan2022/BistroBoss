import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, coverImg }) => {
  return (
    <section className="mb-12 px-5 lg:px-14">
      {title && <Cover coverTitle={title} bgImg={coverImg} height={450} />}
      <div className="grid md:grid-cols-2 gap-10 mt-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default MenuCategory;
