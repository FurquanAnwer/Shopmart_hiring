import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        max-w-[1920px]
        mx-auto
        xl:px-28
        lg:px-16
        md:px-8
        sm:px-6
        px-4
      "
    >
      {children}
    </div>
  );
};

export default Container;
