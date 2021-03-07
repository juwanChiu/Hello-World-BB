import { touchStart, touchMove, touchEnd } from "../utils/touch-animation";

const Slide = ({ index, children }) => {
  return (
    <div index={index}
      onTouchStart={(event) => touchStart(event, index)}
      onTouchEnd={touchEnd}
      onTouchMove={touchMove}
      onMouseDown={(event) => touchStart(event, index)}
      onMouseUp={touchEnd}
      onMouseLeave={touchEnd}
      onMouseMove={touchMove}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }}
      className="slide">
      {children}
    </div>
  );
}

export default Slide;