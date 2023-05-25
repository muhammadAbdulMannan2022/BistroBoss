const Card = ({ item }) => {
  const { name, image, price, recipe } = item;
  return (
    <div className="card w-96 h-[500px] bg-base-100 shadow-xl">
      <figure className="relative">
        <img src={image} alt="Shoes" />
        <div className="absolute top-[15px] right-[50px] text-white bg-slate-900 px-3 py-2 rounded">
          ${price}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
