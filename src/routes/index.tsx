
import DashboardPage from "@/pages/(dashboard)/admin/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductAdd from "@/pages/(dashboard)/products/add/add";
import BookDeatil from "@/pages/(dashboard)/products/detail/detail";
import EditProduct from "@/pages/(dashboard)/products/edit/edit";
import ProductAdminPage from "@/pages/(dashboard)/products/page";
import Signin from "@/pages/(website)/auth/Signin";
import Signup from "@/pages/(website)/auth/Signup";
import LayoutHomePage from "@/pages/(website)/layout";
import HomePage from "@/pages/(website)/page";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return <Routes>

    <Route path="/admin" element={<LayoutAdmin/>}>
    <Route index element={<DashboardPage/>} />
    <Route path="books" element={<ProductAdminPage/>} />
    <Route path="books/:id/detail" element={<BookDeatil/>} />
    <Route path="books/add" element={<ProductAdd/>} />
    <Route path="books/:id/edit" element={<EditProduct/>} />
    <Route path="signin" element={<Signin/>}/>
    <Route path="signup" element={<Signup/>}/>
    </Route>

    <Route path="/" element={<LayoutHomePage/>}>
        <Route index element={<HomePage/>} />
    </Route>

    </Routes>;
};
export default Router;
