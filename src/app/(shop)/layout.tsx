import TopMenu from "@/components/ui/top-menu/TopMenu";
import SideBar from "@/components/ui/sidebar/SideBar";
import Footer from "@/components/ui/footer/Footer";


export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen">
            <TopMenu />
            <SideBar />
            <div className="px-0 sm:px-10">
                {children}
            </div>
            <Footer />
        </main>
    )
}