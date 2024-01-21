import Footer from "@/app/partials/footer";
import Header from "@/app/partials/header";
import ContactForm from "@/app/tools/form/contact";

export default function Contact() {
    return (
        <>
            <Header />
            <form className="w-full px-12 md:px-0 md:w-2/3 mx-auto my-12">
                <ContactForm />
            </form>
            <Footer />
        </>
    )
}