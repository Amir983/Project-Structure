interface Iprops {
  imageURL: string;
  Alt: string;
  className: string;
}

const Imag = ({ imageURL, Alt, className }: Iprops) => {
  return (
    <div>
      <img src={imageURL} alt={Alt} className={className} />
    </div>
  );
};

export default Imag;
