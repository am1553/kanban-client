import { ColorRing } from "react-loader-spinner";

function Loader() {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperClass="color-ring-wrapper"
      colors={["#635FC7", "#A8A4FF", "#EA5555", "#A8A4FF50", "#FF9898"]}
    />
  );
}

export default Loader;
