import { Parallax } from "react-parallax";

const Cover = ({ bgImg, height, coverTitle }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={bgImg}
      bgImageAlt="Menu"
      strength={-200}
    >
      <div className={`hero`} style={{ height: `${height}px` }}>
        <div className="bg-black p-2 bg-opacity-75">
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold uppercase">
                {coverTitle}
              </h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
