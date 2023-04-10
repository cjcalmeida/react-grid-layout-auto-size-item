import React, { FunctionComponent, PropsWithChildren, useLayoutEffect, useRef } from 'react';
import './ReactGridItemWrapper.css';

type DimensionType = {
  key: string;
  width: number;
  height: number;
};

type ReactGridItemWrapperProps = {
  keyName: string;
  onResizeItem: (dimension: DimensionType) => void;
};

const ReactGridItemWrapper: FunctionComponent<PropsWithChildren<ReactGridItemWrapperProps>> = ({
  children,
  onResizeItem,
  keyName,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const recalculateDimensions = () => {
    if (ref.current) {
      onResizeItem({
        key: keyName,
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  };

  useLayoutEffect(() => {
    recalculateDimensions();
    window.addEventListener('resize', recalculateDimensions);
    return () => window.removeEventListener('resize', recalculateDimensions);
  }, []);

  return (
    <div className="grid-item-wrapper" ref={ref}>
      {children}
    </div>
  );
};

export { ReactGridItemWrapper, ReactGridItemWrapperProps, DimensionType };
