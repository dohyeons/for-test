import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <div className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[1200px] flex-1 px-4 md:min-h-[calc(100vh-60px)] md:px-6 lg:bg-gray-50 lg:px-[93px]">
        {children}
        <ScrollToTop />
      </div>
    </div>
  );
}
