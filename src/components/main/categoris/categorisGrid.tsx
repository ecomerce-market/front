type CategoriseGridProps = {
  main: string;
  sub: string;
};

const CategoriseGrid = ({ main, sub }: CategoriseGridProps) => {
  return (
    <div>
      {main}
      <div>{sub}</div>
    </div>
  );
};

export default CategoriseGrid;
