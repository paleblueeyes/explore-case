import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { AiFillLeftCircle as ArrowLeft } from "react-icons/ai";
import { AiFillRightCircle as ArrowRight } from "react-icons/ai";

const getItems = () => {
  const days = ["MAN", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const it = Array(31)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}`, day: days[(ind + 1) % 7] }));
  return it;
};

function HorizontalCalendar() {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <ScrollMenu RightArrow={RightArrow} LeftArrow={LeftArrow}>
      {items.map(({ id, day }, idx) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          title={id}
          key={id}
          idx={idx}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
          day={day}
        />
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <ArrowLeft
      className="text-white mt-14"
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    >
      Left
    </ArrowLeft>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <ArrowRight
      className="text-white mt-14"
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      Right
    </ArrowRight>
  );
}

function Card({ onClick, selected, title, itemId, idx, day }) {
  const visibility = React.useContext(VisibilityContext);
  console.log(day);
  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: "60px",
        display: "flex",
        justifyContent: "center",
      }}
      tabIndex={0}
      className="my-8"
    >
      <div className="text-white">
        <p className="text-white text-xs ml-1">{day}</p>
        <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-300 flex justify-center item-center text-gray-800 text-sm">
          <p className="mt-1">{idx + 1}</p>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCalendar;
