import React, { Suspense } from "react";

const loading = () => <div className="text-center" />;



function Layout(props) {
  const children = props.children || null;
  return (
    <>
      <Suspense fallback={loading()}>{children}</Suspense>
    </>
  );
}

export default Layout;
