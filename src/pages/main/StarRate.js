import React from "react";
import "../../components/css/FullMapStyle.css";

class StarRate extends React.Component {
  state = {
    score: 0,
  };
  resetRating(e) {
    if (e.type === "mouseleave" || e.type === "onTouchEnd") {
      this.props.onChange(this.props.cacheIdx, this.props.cacheRating);
    }
  }
  paintStars() {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      let starClass = "starRate";
      if (this.props.rating !== 0) {
        if (i <= this.props.sIdx) {
          if (this.props.sIdx === i && this.props.rating % 2 !== 0) {
            starClass += "isHalfSelected";
          } else {
            starClass += "isSelected";
          }
        }
      } else if (this.props.cacheRating !== 0) {
        if (i <= this.props.cacheIdx) {
          if (this.props.cacheIdx === i && this.props.cacheRating % 2 !== 0) {
            starClass += "isHalfSelected";
          } else {
            starClass += "isSelected";
          }
        }
      }

      stars.push(
        <label
          key={i}
          className={starClass}
          onClick={() => {
            this.props.onChange(this.props.sIdx, this.props.rating);
          }}
          onMouseOver={(e) => {
            this.props.onMouseOver(e, i);
          }}
          onMouseMove={(e) => {
            this.props.onMouseOver(e, i);
          }}
          onMouseLeave={(e) => {
            this.resetRating(e);
          }}
          onTouchMove={(e) => {
            this.props.onMouseOver(e, i);
          }}
          onTouchStart={(e) => {
            this.props.onMouseOver(e, i);
          }}
          onTouchEnd={(e) => {
            this.resetRating(e);
          }}
        />
      );
    }
    return stars;
  }

  render() {
    return <div>{this.paintStars()}</div>;
  }
}
export default StarRate;
