import React, { useRef, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import './ReactGridLayoutWrapper.css';
import { RandomSize } from '../RandomSize/RandomSize';
import { DimensionType, ReactGridItemWrapper } from '../ReactGridItemWrapper';

const ResponsiveGridLayout = WidthProvider(Responsive);

const calculateWH = (widthPx: number, heightPx: number, colWidth: number, rowHeight: number, margin: number[]) => {
  const w = Math.ceil((widthPx - margin[0]) / (colWidth + margin[0]));
  const h = Math.ceil((heightPx - margin[1]) / (rowHeight + margin[1]));
  return [w, h];
};

const defaultLayout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 1 },
  { i: 'b', x: 0, y: 1, w: 1, h: 1 },
  { i: 'c', x: 0, y: 2, w: 1, h: 1 },
  { i: 'd', x: 0, y: 0, w: 1, h: 1 },
];

const ReactGridLayoutWrapper = () => {
  const [layout, setLayout] = useState<Layout[]>([...defaultLayout]);

  const handleSizeChange = (size: DimensionType) => {
    setLayout((prevLayout) => {
      const [w, h] = calculateWH(size.width, size.height, 63, 25, [10, 10]);
      const newLayouts = prevLayout.map((layoutItem) => {
        if (layoutItem.i === size.key) {
          return { ...layoutItem, w: w, h: h };
        } else {
          return { ...layoutItem };
        }
      });
      return newLayouts;
    });
  };

  const targetRef = useRef<HTMLDivElement>(null);
  const layouts: Layouts = { lg: layout };

  return (
    <div ref={targetRef}>
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 24, md: 24, sm: 4, xs: 4, xxs: 2 }}
        rowHeight={25}
        layouts={layouts}
        isBounded
        compactType={'horizontal'}
      >
        <div key="a" ref={targetRef}>
          <ReactGridItemWrapper keyName="a" onResizeItem={handleSizeChange}>
            <RandomSize />
          </ReactGridItemWrapper>
        </div>
        <div key="b">
          <ReactGridItemWrapper keyName="b" onResizeItem={handleSizeChange}>
            <RandomSize />
          </ReactGridItemWrapper>
        </div>
        <div key="c">
          <ReactGridItemWrapper keyName="c" onResizeItem={handleSizeChange}>
            <RandomSize />
          </ReactGridItemWrapper>
        </div>
        <div key="d">
          <ReactGridItemWrapper keyName="d" onResizeItem={handleSizeChange}>
            <RandomSize />
          </ReactGridItemWrapper>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export { ReactGridLayoutWrapper };
