import Sidebar from './Sidebar';

const DashboardLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Sidebar />
      <main className={className}>{children}</main>
    </>
  );
};

export default DashboardLayout;
