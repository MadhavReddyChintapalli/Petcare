import Skeleton from "@material-ui/lab/Skeleton";

const LoadingSkeleton = ({
  width = "100%",
  height = 30,
  variant = "rect",
  marginTop = 10,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
}) => {
  return (
    <div style={{ marginTop, marginBottom, marginLeft, marginRight }}>
      <Skeleton width={width} height={height} variant={variant} />
    </div>
  );
};

export default LoadingSkeleton;
