import {getAccessToken} from "../../utils/sessionTokenAccessor";
import {redirect} from "next/navigation";
import {SetDynamicRoute} from "../../utils/setDynamicRoute";
import {authOptions} from "../api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";

async function getAllProducts() {
    try {
        const url = `${process.env.DEMO_BACKEND_URL}/api/v1/products`;

        let accessToken = await getAccessToken();

        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        });

        if (resp.ok) {
            const data = await resp.json();
            return data;
        }
    } catch (err: any) {
        throw new Error(err);
    }
}

export default async function Products() {
    const session = await getServerSession(authOptions);

    if (session && session.roles?.includes("viewer")) {
        try {
            const products = await getAllProducts();

            return (
                <main>
                    <SetDynamicRoute></SetDynamicRoute>
                    <h1 className="text-4xl text-center">Products</h1>
                    <table className="border border-gray-500 text-lg ml-auto mr-auto mt-6">
                        <thead>
                            <tr>
                                <th className="bg-blue-900 p-2 border border-gray-500">
                                    Id
                                </th>
                                <th className="bg-blue-900 p-2 border border-gray-500">
                                    Name
                                </th>
                                <th className="bg-blue-900 p-2 border border-gray-500">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p: any) => (
                                <tr key={p.Id}>
                                    <td className="p-1 border border-gray-500 text-white">
                                        {p.Id}
                                    </td>
                                    <td className="p-1 border border-gray-500 text-white">
                                        {p.Name}
                                    </td>
                                    <td className="p-1 border border-gray-500 text-white">
                                        {p.Price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            );
        } catch (err) {
            console.error(err);

            return (
                <main>
                    <h1 className="text-4xl text-center">Products</h1>
                    <p className="text-red-600 text-center text-lg">
                        Sorry, an error happened. Check the server logs.
                    </p>
                </main>
            );
        }
    }

    redirect("/unauthorized");
}
