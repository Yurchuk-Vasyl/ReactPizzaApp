import React from 'react';
import ContentLoader from 'react-content-loader';

type SkeletonProps = {};

const Skeleton: React.FC<SkeletonProps> = (props) => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 485"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="265" rx="15" ry="15" width="280" height="30" />
      <circle cx="140" cy="128" r="125" />
      <rect x="0" y="310" rx="10" ry="10" width="280" height="90" />
      <rect x="0" y="427" rx="10" ry="10" width="95" height="35" />
      <rect x="126" y="421" rx="25" ry="29" width="145" height="45" />
    </ContentLoader>
  </div>
);

export default Skeleton;
